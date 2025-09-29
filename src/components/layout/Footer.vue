<template>
    <div class="w-full relative bg-white border-t border-[#e0e0e0] box-border flex flex-col items-start pt-[90px] pr-[90px] pb-[42px] pl-[120px] gap-[42px] text-left text-base text-[#212121] font-['Plus_Jakarta_Sans']">
        <div class="self-stretch flex flex-col items-start gap-[62px]">
            <img class="w-[118px] h-[30.7px] object-cover" src="/logo/logo.png" alt="" />
            <div class="self-stretch flex items-start justify-between gap-[20px]">
                <div class="w-[245px] flex flex-col items-start gap-[20px]">
                    <div class="self-stretch relative leading-[160%] capitalize font-semibold">Category</div>
                    <div class="self-stretch flex flex-col items-start gap-[24px] text-[#616161]">
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Travel Agencies</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Horseback Trekking</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Cultural Tours</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Seasonal Packages</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Hotels & Camps</div>
                    </div>
                </div>
                <div class="w-[245px] flex flex-col items-start gap-[20px]">
                    <div class="self-stretch relative leading-[160%] capitalize font-semibold">For Agencies</div>
                    <div class="self-stretch flex flex-col items-start gap-[24px] text-[#616161]">
                        <div class="relative leading-[160%] capitalize font-medium">Register Your Company</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">How It Works</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Agency Dashboard</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">FAQs</div>
                    </div>
                </div>
                <div class="w-[245px] flex flex-col items-start gap-[20px]">
                    <div class="self-stretch relative leading-[160%] capitalize font-semibold">Resources</div>
                    <div class="self-stretch flex flex-col items-start gap-[24px] text-[#616161]">
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">About Us</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Contact Support</div>
                        <div class="relative leading-[160%] capitalize font-medium">Blog (Coming Soon)</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Terms & Conditions</div>
                        <div class="self-stretch relative leading-[160%] capitalize font-medium">Privacy Policy</div>
                    </div>
                </div>
                <div class="flex flex-col items-start gap-[20px]">
                    <div class="self-stretch relative leading-[160%] capitalize font-semibold">Connect With Us</div>
                    <div class="w-[245px] flex flex-col items-start gap-[16px] text-[#616161]">
                        <div class="self-stretch flex items-center gap-[8px] cursor-pointer hover:text-[#212121] group">
                            <svg class="w-6 h-6 text-[#616161] group-hover:text-[#212121]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <div class="relative leading-[160%] capitalize font-medium">Facebook</div>
                        </div>
                        <div class="self-stretch flex items-center gap-[8px] cursor-pointer hover:text-[#212121] group">
                            <svg class="w-6 h-6 text-[#616161] group-hover:text-[#212121]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <div class="relative leading-[160%] capitalize font-medium">Instagram</div>
                        </div>
                        <div class="self-stretch flex items-center gap-[8px] cursor-pointer hover:text-[#212121] group">
                            <svg class="w-6 h-6 text-[#616161] group-hover:text-[#212121]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            <div class="relative leading-[160%] capitalize font-medium">Twitter</div>
                        </div>
                        <div class="self-stretch flex items-center gap-[8px] cursor-pointer hover:text-[#212121] group">
                            <svg class="w-6 h-6 text-[#616161] group-hover:text-[#212121]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <div class="relative leading-[160%] capitalize font-medium">support@yellowbook.mn</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <svg class="self-stretch w-full h-[1px] text-[#e0e0e0]" viewBox="0 0 100 1" fill="currentColor">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#e0e0e0" stroke-width="1"/>
        </svg>
        <div class="self-stretch relative leading-[160%] capitalize font-medium text-center">Copyright © 2025 Yellow Book</div>
    </div>
</template>

<style>
/* Responsive Media Queries */
@media (max-width: 1200px) {
    .pt-\[120px\]\.pr-\[120px\]\.pb-\[42px\]\.pl-\[120px\] {
        padding: 80px 60px 32px;
    }
    .self-stretch\.flex\.items-start\.justify-between\.gap-\[20px\] {
        gap: 16px;
    }
    .w-\[245px\] {
        width: 220px;
    }
}

@media (max-width: 992px) {
    .pt-\[120px\]\.pr-\[120px\]\.pb-\[42px\]\.pl-\[120px\] {
        padding: 60px 40px 28px;
        gap: 36px;
    }
    .self-stretch\.flex\.flex-col\.items-start\.gap-\[62px\] {
        gap: 50px;
    }
    .self-stretch\.flex\.items-start\.justify-between\.gap-\[20px\] {
        flex-wrap: wrap;
        gap: 30px;
    }
    .w-\[245px\] {
        width: calc(50% - 15px);
        min-width: 200px;
    }
}

@media (max-width: 768px) {
    .pt-\[120px\]\.pr-\[120px\]\.pb-\[42px\]\.pl-\[120px\] {
        padding: 40px 20px 24px;
        gap: 32px;
    }
    .self-stretch\.flex\.flex-col\.items-start\.gap-\[62px\] {
        gap: 40px;
    }
    .self-stretch\.flex\.items-start\.justify-between\.gap-\[20px\] {
        flex-direction: column;
        gap: 32px;
    }
    .w-\[245px\] {
        width: 100%;
    }
    .w-\[245px\]\.flex\.flex-col\.items-start\.gap-\[16px\] {
        width: 100%;
    }
}

@media (max-width: 576px) {
    .pt-\[120px\]\.pr-\[120px\]\.pb-\[42px\]\.pl-\[120px\] {
        padding: 30px 15px 20px;
        gap: 28px;
    }
    .self-stretch\.flex\.flex-col\.items-start\.gap-\[62px\] {
        gap: 32px;
    }
    .self-stretch\.flex\.items-start\.justify-between\.gap-\[20px\] {
        gap: 28px;
    }
    .w-\[245px\]\.flex\.flex-col\.items-start\.gap-\[20px\] {
        gap: 16px;
    }
    .self-stretch\.flex\.flex-col\.items-start\.gap-\[24px\] {
        gap: 20px;
    }
    .w-\[245px\]\.flex\.flex-col\.items-start\.gap-\[16px\] {
        gap: 12px;
    }
}

@media (max-width: 480px) {
    .pt-\[120px\]\.pr-\[120px\]\.pb-\[42px\]\.pl-\[120px\] {
        padding: 25px 10px 18px;
        font-size: 15px;
    }
    .w-\[118px\]\.h-\[30\.7px\] {
        width: 100px;
        height: 26px;
    }
    .w-6\.h-6 {
        width: 20px;
        height: 20px;
    }
    .self-stretch\.flex\.items-center\.gap-\[8px\] {
        gap: 6px;
    }
}
</style>