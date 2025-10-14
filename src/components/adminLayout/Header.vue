<template>
  	<div class="frame-parent">
    		<div class="logo-wrapper">
      			<img class="logo-icon" src="/logo/logo.png" />
    		</div>
    		<div class="frame-group">
      			<img class="frame-child" alt="" />
      			<div class="frame-group">
        				<img class="frame-item" alt="" />
        				<div class="jane-cooper-parent">
          					<b class="jane-cooper">Jane Cooper</b>
          					<div class="super-admin">Super-Admin</div>
        				</div>
      			</div>
    		</div>
  	</div>
</template>


<style  scoped>.frame-parent {
  	width: 100%;
  	position: relative;
  	box-shadow: 0px 5px 16px rgba(34, 34, 34, 0.09);
  	background-color: #fff;
  	border-bottom: 1px solid #eee;
  	box-sizing: border-box;
  	height: 59px;
  	display: flex;
  	align-items: center;
  	justify-content: space-between;
  	padding: 8px 32px;
  	gap: 0px;
  	text-align: left;
  	font-size: 16px;
  	color: #212121;
  	font-family: 'Plus Jakarta Sans';
}
  	.logo-wrapper {
    		width: 272px;
    		display: flex;
    		align-items: center;
    		justify-content: center;
    		padding: 10px;
    		box-sizing: border-box;
  	}
  	.logo-icon {
    		height: 27.6px;
    		width: 118px;
    		object-fit: cover;
  	}
  	.frame-group {
    		display: flex;
    		align-items: center;
    		gap: 8px;
  	}
  	.frame-child {
    		height: 40px;
    		width: 40px;
    		border-radius: 50px;
  	}
  	.frame-item {
    		width: 32px;
    		position: relative;
    		border-radius: 50%;
    		max-height: 100%;
    		object-fit: cover;
  	}
  	.jane-cooper-parent {
    		width: 110px;
    		display: flex;
    		flex-direction: column;
    		align-items: flex-start;
    		justify-content: center;
    		gap: 12px;
  	}
  	.jane-cooper {
    		align-self: stretch;
    		position: relative;
    		line-height: 130%;
    		text-transform: capitalize;
  	}
  	.super-admin {
    		align-self: stretch;
    		position: relative;
    		font-size: 14px;
    		line-height: 130%;
    		text-transform: capitalize;
    		color: #616161;
  	}

</style>