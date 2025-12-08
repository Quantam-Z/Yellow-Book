#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { baseParse, NodeTypes } from '@vue/compiler-dom'
import * as babelParser from '@babel/parser'
import traverseModule from '@babel/traverse'

const traverse = traverseModule.default || traverseModule

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const srcDir = path.join(projectRoot, 'src')
const localesDir = path.join(srcDir, 'locales')
const outputFile = path.join(localesDir, 'en.json')
const extraFiles = ['app.vue', 'metaTag.js']
  .map((relativePath) => path.join(projectRoot, relativePath))
  .filter(Boolean)
const IGNORE_FILES = new Set([
  path.join(srcDir, 'config', 'formKitTheme.js'),
  path.join(srcDir, 'composables', 'useStatusClass.js'),
  path.join(srcDir, 'utils', 'filterUtils.js'),
])

const parserOptions = {
  sourceType: 'module',
  allowAwaitOutsideFunction: true,
  plugins: [
    'typescript',
    'decorators-legacy',
    'classProperties',
    'classPrivateMethods',
    'classPrivateProperties',
    'jsx',
    'topLevelAwait',
    'dynamicImport',
  ],
}

const TEXT_KEY_HINTS = [
  'title',
  'subtitle',
  'label',
  'description',
  'question',
  'answer',
  'message',
  'placeholder',
  'cta',
  'button',
  'tagline',
  'summary',
  'heading',
  'eyebrow',
  'empty',
  'success',
  'error',
  'hero',
  'section',
  'tooltip',
  'alt',
  'status',
  'toast',
  'notification',
  'intro',
  'outro',
  'helper',
  'support',
  'lead',
  'link',
  'menu',
  'nav',
  'item',
  'name',
  'value',
  'text',
  'copy',
  'stat',
  'filter',
  'table',
  'column',
  'card',
  'banner',
  'overview',
  'ctaLabel',
  'ctaText',
  'modal',
  'dialog',
  'tooltip',
  'callout',
  'search',
]

const ATTRIBUTE_HINTS = new Set([
  'aria-label',
  'aria-description',
  'aria-details',
  'aria-errormessage',
  'aria-valuetext',
  'aria-roledescription',
  'aria-placeholder',
  'title',
  'placeholder',
  'alt',
  'role-label',
  'data-tooltip',
])

const ATTRIBUTE_KEYWORDS = ['label', 'title', 'placeholder', 'tooltip', 'description', 'summary', 'message', 'helper', 'eyebrow', 'heading', 'cta', 'text']

const DISALLOWED_VALUES = new Set(['true', 'false', 'null', 'undefined'])

const SUPPORTED_EXTENSIONS = new Set(['.vue', '.js', '.ts', '.mjs', '.cjs', '.mts', '.cts'])
const SKIP_DIRS = new Set(['node_modules', '.nuxt', '.output', '.git', 'public'])

class TranslationCollector {
  constructor(rootDir) {
    this.rootDir = rootDir
    this.tree = {}
    this.scopeMaps = new Map()
    this.total = 0
    this.files = new Set()
  }

  add(filePath, rawText) {
    const normalized = normalizeText(rawText)
    if (!normalized) return

    const relPath = this.#relativeScope(filePath)
    if (!relPath) return
    this.files.add(relPath)

    const segments = relPath.split('/').filter(Boolean)
    if (!segments.length) {
      segments.push('root')
    }

    let cursor = this.tree
    let scopeKey = ''
    for (const originalSegment of segments) {
      const segment = sanitizeSegment(originalSegment)
      if (!segment) continue
      if (!cursor[segment] || typeof cursor[segment] !== 'object' || Array.isArray(cursor[segment])) {
        cursor[segment] = {}
      }
      cursor = cursor[segment]
      scopeKey += scopeKey ? `/${segment}` : segment
    }

    if (!scopeKey) return

    if (!this.scopeMaps.has(scopeKey)) {
      this.scopeMaps.set(scopeKey, new Map())
    }

    const scopeMap = this.scopeMaps.get(scopeKey)
    if (scopeMap.has(normalized)) {
      return
    }

    const baseKey = slugifyText(normalized)
    let key = baseKey || `text_${scopeMap.size + 1}`
    let suffix = 2
    while (Object.prototype.hasOwnProperty.call(cursor, key) && cursor[key] !== normalized) {
      key = `${baseKey || 'text'}_${suffix++}`
    }

    cursor[key] = normalized
    scopeMap.set(normalized, key)
    this.total += 1
  }

  getResult() {
    return sortObject(this.tree)
  }

  #relativeScope(filePath) {
    const rel = path.relative(this.rootDir, filePath).replace(/\\/g, '/')
    if (rel.startsWith('..')) return null
    const trimmed = rel.startsWith('src/') ? rel.slice(4) : rel
    return trimmed.replace(/\.[^.]+$/, '')
  }
}

const collector = new TranslationCollector(projectRoot)

async function main() {
  console.log('🗂️  Scanning project for user-facing strings...')
  await walkDirectory(srcDir)
  for (const filePath of extraFiles) {
    const exists = await fileExists(filePath)
    if (exists) {
      await processFile(filePath)
    }
  }

  await fs.mkdir(localesDir, { recursive: true })
  const result = collector.getResult()
  await fs.writeFile(outputFile, JSON.stringify(result, null, 2) + '\n', 'utf8')

  console.log(
    `✅ Generated ${collector.total} strings from ${collector.files.size} files -> ${path.relative(
      projectRoot,
      outputFile,
    )}`,
  )
}

async function walkDirectory(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    if (SKIP_DIRS.has(entry.name)) continue
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      await walkDirectory(fullPath)
    } else if (entry.isFile()) {
      await processFile(fullPath)
    }
  }
}

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    return
  }
  if (IGNORE_FILES.has(filePath)) {
    return
  }

  const content = await fs.readFile(filePath, 'utf8')
  if (ext === '.vue') {
    await processVueFile(filePath, content)
  } else {
    processScriptContent(content, filePath, { source: 'script' })
  }
}

async function processVueFile(filePath, fileContent) {
  const { descriptor } = parseSfc(fileContent, { filename: filePath })
  if (descriptor.template?.content) {
    extractFromTemplate(descriptor.template.content, filePath)
  }
  if (descriptor.script?.content) {
    processScriptContent(descriptor.script.content, filePath, { source: 'script' })
  }
  if (descriptor.scriptSetup?.content) {
    processScriptContent(descriptor.scriptSetup.content, filePath, { source: 'script' })
  }
}

function extractFromTemplate(templateCode, filePath) {
  let ast
  try {
    ast = baseParse(templateCode)
  } catch (error) {
    console.warn(`⚠️  Failed to parse template in ${filePath}: ${error.message}`)
    fallbackTemplateExtraction(templateCode, filePath)
    return
  }

  const visit = (node) => {
    if (!node) return
    switch (node.type) {
      case NodeTypes.ROOT:
      case NodeTypes.FRAGMENT:
        node.children?.forEach(visit)
        break
      case NodeTypes.ELEMENT:
        node.props?.forEach((prop) => {
          if (prop.type === NodeTypes.ATTRIBUTE && prop.value?.content) {
            if (shouldCaptureAttribute(prop.name)) {
              recordCandidate(filePath, prop.value.content, {
                attrName: prop.name,
                allowShortStrings: true,
              })
            }
          } else if (prop.type === NodeTypes.DIRECTIVE && prop.exp?.content) {
            const directiveName =
              prop.arg && prop.arg.type === NodeTypes.SIMPLE_EXPRESSION ? prop.arg.content : prop.name
            extractFromExpression(prop.exp.content, filePath, {
              source: 'template-directive',
              attrName: directiveName,
            })
          }
        })
        node.children?.forEach(visit)
        break
      case NodeTypes.TEXT:
        recordCandidate(filePath, node.content, {
          allowShortStrings: true,
          forceInclude: true,
        })
        break
      case NodeTypes.INTERPOLATION:
        if (node.content?.content) {
          extractFromExpression(node.content.content, filePath, {
            source: 'template-expression',
            allowShortStrings: true,
          })
        }
        break
      default:
        break
    }
  }

  visit(ast)
}

function fallbackTemplateExtraction(templateCode, filePath) {
  const textPattern = />\s*([^<>{}]+?)\s*</g
  let textMatch
  while ((textMatch = textPattern.exec(templateCode))) {
    recordCandidate(filePath, textMatch[1], {
      allowShortStrings: true,
      forceInclude: true,
    })
  }

  const attrPattern =
    /\b(aria-label|aria-description|aria-valuetext|aria-details|aria-errormessage|title|placeholder|alt|label|role-label|data-tooltip)\b\s*=\s*["'`]([^"'`]+)["'`]/gi
  let attrMatch
  while ((attrMatch = attrPattern.exec(templateCode))) {
    recordCandidate(filePath, attrMatch[2], {
      attrName: attrMatch[1],
      allowShortStrings: true,
    })
  }
}

function processScriptContent(code, filePath, meta = {}) {
  if (!code?.trim()) return
  let ast
  try {
    ast = babelParser.parse(code, parserOptions)
  } catch (error) {
    console.warn(`⚠️  Failed to parse script in ${filePath}: ${error.message}`)
    return
  }

  traverse(ast, {
    StringLiteral(path) {
      if (shouldSkipLiteral(path)) return
      const context = buildContextHints(path, meta)
      recordCandidate(filePath, path.node.value, context)
    },
    TemplateLiteral(path) {
      if (shouldSkipTemplate(path)) return
      const context = buildContextHints(path, meta)
      if (path.node.expressions.length === 0) {
        const value = path.node.quasis.map((q) => q.value.cooked ?? q.value.raw).join('')
        recordCandidate(filePath, value, context)
      }
    },
  })
}

function extractFromExpression(expressionCode, filePath, meta = {}) {
  if (!expressionCode?.trim()) return
  let ast
  try {
    ast = babelParser.parse(`(${expressionCode})`, parserOptions)
  } catch {
    return
  }

  traverse(ast, {
    StringLiteral(path) {
      if (shouldSkipLiteral(path)) return
      const context = buildContextHints(path, {
        ...meta,
      })
      recordCandidate(filePath, path.node.value, context)
    },
    TemplateLiteral(path) {
      if (shouldSkipTemplate(path)) return
      if (path.node.expressions.length === 0) {
        const value = path.node.quasis.map((q) => q.value.cooked ?? q.value.raw).join('')
        const context = buildContextHints(path, { ...meta })
        recordCandidate(filePath, value, context)
      }
    },
  })
}

function recordCandidate(filePath, text, meta = {}) {
  const attrLower = meta.attrName ? String(meta.attrName).toLowerCase() : ''
  if (attrLower === 'class' || attrLower === 'style') {
    return
  }
  const normalized = normalizeText(text)
  if (!normalized) return
  const lower = normalized.toLowerCase()
  if (DISALLOWED_VALUES.has(lower)) return
  if (!/[a-z]/i.test(normalized)) return
  if (looksLikePath(normalized) && !meta.allowPathLike) return
  if (looksLikeUtilityString(normalized)) return

  const hasSpace = /\s/.test(normalized)
  const hasHint =
    Boolean(meta.forceInclude) ||
    containsHint(meta.keyName) ||
    containsHint(meta.identifierName) ||
    containsHint(meta.attrName) ||
    containsHint(meta.calleeName)

  const allowShort = Boolean(meta.allowShortStrings || meta.forceInclude)
  if (!hasSpace && !hasHint && !allowShort) return

  collector.add(filePath, normalized)
}

function shouldSkipLiteral(path) {
  const parent = path.parent
  if (!parent) return false
  if (
    parent.type === 'ImportDeclaration' ||
    parent.type === 'ExportDeclaration' ||
    parent.type === 'ExportAllDeclaration' ||
    parent.type === 'ExportSpecifier'
  ) {
    return true
  }
  if (parent.type === 'DirectiveLiteral') return true
  if (parent.type === 'TSLiteralType') return true
  return false
}

function shouldSkipTemplate(path) {
  if (path.node.expressions.length > 0) {
    return true
  }
  return shouldSkipLiteral(path)
}

function buildContextHints(path, meta = {}) {
  const context = { ...meta }

  const parent = path.parent
  if (parent?.type === 'ObjectProperty' && parent.value === path.node) {
    context.keyName = extractPropertyKey(parent.key)
  }

  if (!context.identifierName) {
    const varDeclarator = path.findParent((p) => p.isVariableDeclarator())
    if (varDeclarator?.node?.id?.type === 'Identifier') {
      context.identifierName = varDeclarator.node.id.name
    }
  }

  if (parent?.type === 'CallExpression') {
    context.calleeName = extractCalleeName(parent.callee)
  }

  if (parent?.type === 'JSXAttribute' && parent.value === path.node) {
    context.attrName = parent.name?.name
  }

  if (parent?.type === 'ObjectProperty' && parent.value === path.node && !context.attrName) {
    context.attrName = context.keyName
  }

  if (context.attrName && ATTRIBUTE_HINTS.has(context.attrName.toLowerCase())) {
    context.allowShortStrings = true
  }

  return context
}

function extractPropertyKey(keyNode) {
  if (!keyNode) return undefined
  if (keyNode.type === 'Identifier') return keyNode.name
  if (keyNode.type === 'StringLiteral') return keyNode.value
  return undefined
}

function extractCalleeName(callee) {
  if (!callee) return undefined
  if (callee.type === 'Identifier') return callee.name
  if (callee.type === 'MemberExpression') {
    if (callee.property?.type === 'Identifier') return callee.property.name
  }
  return undefined
}

function normalizeText(value) {
  if (!value) return ''
  const collapsed = value.replace(/\s+/g, ' ').trim()
  return collapsed
}

function containsHint(source) {
  if (!source) return false
  const lower = String(source).toLowerCase()
  return TEXT_KEY_HINTS.some((hint) => lower.includes(hint.toLowerCase()))
}

function shouldCaptureAttribute(name) {
  if (!name) return false
  const lower = name.toLowerCase()
  if (ATTRIBUTE_HINTS.has(lower)) return true
  return ATTRIBUTE_KEYWORDS.some((keyword) => lower.includes(keyword))
}

function looksLikePath(value) {
  if (!value) return false
  if (/^https?:\/\//i.test(value)) return true
  if (value.startsWith('./') || value.startsWith('../') || value.startsWith('~/') || value.startsWith('@/')) {
    return true
  }
  if (value.includes('/') && /\.[a-z0-9]{2,}$/i.test(value)) return true
  return false
}

const UTILITY_CLASS_REGEX =
  /\b(bg|text|flex|grid|min-w|max-w|border|items|justify|gap|px|py|pl|pr|pt|pb|mt|mb|ml|mr|w|h|font|tracking|leading|ring|shadow|rounded|space|z|formkit|peer|data)\s*[-[]/i

function looksLikeUtilityString(value) {
  if (!value) return false
  return UTILITY_CLASS_REGEX.test(value)
}

function slugifyText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60)
}

function sanitizeSegment(segment) {
  return segment
    .replace(/\[|\]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '')
}

function sortObject(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return input
  }
  const sorted = {}
  for (const key of Object.keys(input).sort()) {
    sorted[key] = sortObject(input[key])
  }
  return sorted
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

main().catch((error) => {
  console.error('❌ Failed to generate language file:', error)
  process.exitCode = 1
})
