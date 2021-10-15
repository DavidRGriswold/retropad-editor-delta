{
	let imageNames = `1.png
		2-button_gba_modified.png
		2-button_gba.png
		2-button.png
		2.png
		3-button.png
		4-button.png
		6-button_genesis.png
		6-button.png
		analog.png
		A_nxengine.png
		A.png
		A_right_nxengine.png
		A_wswan.png
		B.png
		B_wswan.png
		c_down.png
		circle.png
		c_left.png
		coin.png
		C.png
		C_pokemini.png
		C_pokemini_smaller.png
		c_right.png
		cross.png
		c_up.png
		digital.png
		dpad-down_no-mark.png
		dpad-down.png
		dpad-down_psx_no-mark.png
		dpad-down_psx.png
		dpad-left_no-mark.png
		dpad-left.png
		dpad-left_psx_no-mark.png
		dpad-left_psx.png
		dpad-right_no-mark.png
		dpad-right.png
		dpad-right_psx_no-mark.png
		dpad-right_psx.png
		dpad-up_no-mark.png
		dpad-up.png
		dpad-up_psx_no-mark.png
		dpad-up_psx.png
		D.png
		E.png
		fast_forward.png
		F.png
		genesis_mode.png
		hide.png
		III.png
		II.png
		I.png
		IV.png
		keyboard.png
		L1_down.png
		L1_down_smaller.png
		L1.png
		L1_smaller.png
		L2.png
		L2_up.png
		L3.png
		L3_smaller.png
		L_and_R_down.png
		L_and_R_left.png
		L_and_R.png
		L_down.png
		L_down_smaller_gba.png
		L_face.png
		L.png
		L_right.png
		L_right_smaller.png
		L_smaller.png
		no-analog.png
		overlay-A.png
		overlay-B.png
		overlay-C.png
		overlay-D.png
		pause_square_text.png
		pokemini_power.png
		pokemini_shake.png
		R1.png
		R1_smaller.png
		R2.png
		R2_up.png
		R3_smaller.png
		R_down.png
		R_down_smaller.png
		reset_square_text.png
		R_face.png
		rgui.png
		rotate.png
		R.png
		R_smaller.png
		select_psx.png
		select_rounded_big.png
		select_square_text.png
		show.png
		S_nxengine.png
		square.png
		start_dc.png
		start_genesis.png
		start.png
		start_psx.png
		start_rounded_big.png
		start_rounded.png
		test.png
		thumbstick-background.png
		thumbstick-pad_arcade.png
		thumbstick-pad-hollow.png
		thumbstick-pad.png
		triangle.png
		VI.png
		V.png
		W_nxengine.png
		X1_wswan.png
		X2_wswan.png
		X3_wswan.png
		X4_wswan.png
		X.png
		Y1_wswan.png
		Y2_wswan.png
		Y3_wswan.png
		Y4_wswan.png
		Y.png
		Z_down.png
		Z_down_smaller.png
		Z.png`.replace(/(\n)\s+/g, "$1").split("\n");

	window.defaultImagesObj = {};
	imageNames.forEach((el) => { defaultImagesObj[el] = "img/" + el });

	window.defaultConfigString = `overlays = 2
		overlay0_full_screen = true
		overlay0_normalized = true
		overlay0_name = "landscape"
		overlay0_range_mod = 1.5
		overlay0_alpha_mod = 2.0
		overlay1_full_screen = true
		overlay1_normalized = true
		overlay1_name = "portrait"
		overlay1_range_mod = 1.5
		overlay1_alpha_mod = 2.0
		overlay0_descs = 20
		overlay0_desc0 = "left,0.07188,0.77778,radial,0.04479,0.06852"
		overlay0_desc0_overlay = dpad-left.png
		overlay0_desc1 = "right,0.17813,0.77778,radial,0.04479,0.06852"
		overlay0_desc1_overlay = dpad-right.png
		overlay0_desc2 = "up,0.12500,0.68333,radial,0.03854,0.07963"
		overlay0_desc2_overlay = dpad-up.png
		overlay0_desc3 = "down,0.12500,0.87222,radial,0.03854,0.07963"
		overlay0_desc3_overlay = dpad-down.png
		overlay0_desc4 = "left|up,0.05625,0.65556,rect,0.03021,0.05370"
		overlay0_desc5 = "right|up,0.19375,0.65556,rect,0.03021,0.05370"
		overlay0_desc6 = "left|down,0.05625,0.90000,rect,0.03021,0.05370"
		overlay0_desc7 = "right|down,0.19375,0.90000,rect,0.03021,0.05370"
		overlay0_desc8 = "a,0.93750,0.77778,radial,0.04167,0.07407"
		overlay0_desc8_overlay = A.png
		overlay0_desc9 = "b,0.87500,0.88889,radial,0.04167,0.07407"
		overlay0_desc9_overlay = B.png
		overlay0_desc10 = "x,0.87500,0.66667,radial,0.04167,0.07407"
		overlay0_desc10_overlay = X.png
		overlay0_desc11 = "y,0.81250,0.77778,radial,0.04167,0.07407"
		overlay0_desc11_overlay = Y.png
		overlay0_desc12 = "start,0.6,0.91852,rect,0.03958,0.04444"
		overlay0_desc12_overlay = start_psx.png
		overlay0_desc13 = "select,0.4,0.91852,rect,0.040625,0.04259"
		overlay0_desc13_overlay = select_psx.png
		overlay0_desc14 = "l,0.02917,0.50000,rect,0.05208,0.09259"
		overlay0_desc14_overlay = L1.png
		overlay0_desc15 = "l2,0.02917,0.30000,rect,0.05208,0.09259"
		overlay0_desc15_overlay = L2.png
		overlay0_desc16 = "r,0.97083,0.50000,rect,0.05208,0.09259"
		overlay0_desc16_overlay = R1.png
		overlay0_desc17 = "r2,0.97083,0.30000,rect,0.05208,0.09259"
		overlay0_desc17_overlay = R2.png
		overlay0_desc18 = "menu_toggle,0.078,0.08889,radial,0.02604,0.046296"
		overlay0_desc18_overlay = rgui.png
		overlay0_desc19 = "overlay_next,0.922,0.08889,radial,0.02604,0.046296"
		overlay0_desc19_overlay = rotate.png
		overlay0_desc19_next_target = "portrait"
		overlay1_descs = 20
		overlay1_desc0 = "left,0.12037,0.85417,radial,0.07963,0.03854"
		overlay1_desc0_overlay = dpad-left.png
		overlay1_desc1 = "right,0.30926,0.85417,radial,0.07963,0.03854"
		overlay1_desc1_overlay = dpad-right.png
		overlay1_desc2 = "up,0.21481,0.80104,radial,0.06852,0.04479"
		overlay1_desc2_overlay = dpad-up.png
		overlay1_desc3 = "down,0.21481,0.90729,radial,0.06852,0.04479"
		overlay1_desc3_overlay = dpad-down.png
		overlay1_desc4 = "left|up,0.09259,0.78542,rect,0.05370,0.03021"
		overlay1_desc5 = "right|up,0.33704,0.78542,rect,0.05370,0.03021"
		overlay1_desc6 = "left|down,0.09259,0.92292,rect,0.05370,0.03021"
		overlay1_desc7 = "right|down,0.33704,0.92292,rect,0.05370,0.03021"
		overlay1_desc8 = "a,0.88889,0.85417,radial,0.07407,0.04167"
		overlay1_desc8_overlay = A.png
		overlay1_desc9 = "b,0.77778,0.91667,radial,0.07407,0.04167"
		overlay1_desc9_overlay = B.png
		overlay1_desc10 = "x,0.77778,0.79167,radial,0.07407,0.04167"
		overlay1_desc10_overlay = X.png
		overlay1_desc11 = "y,0.66667,0.85417,radial,0.07407,0.04167"
		overlay1_desc11_overlay = Y.png
		overlay1_desc12 = "start,0.65,0.65,rect,0.07037,0.02500"
		overlay1_desc12_overlay = start_psx.png
		overlay1_desc13 = "select,0.35,0.65,rect,0.07222,0.02396"
		overlay1_desc13_overlay = select_psx.png
		overlay1_desc14 = "l,0.04815,0.68021,rect,0.09259,0.05208"
		overlay1_desc14_overlay = L1.png
		overlay1_desc15 = "l2,0.04815,0.56771,rect,0.09259,0.05208"
		overlay1_desc15_overlay = L2.png
		overlay1_desc16 = "r,0.95185,0.68021,rect,0.09259,0.05208"
		overlay1_desc16_overlay = R1.png
		overlay1_desc17 = "r2,0.95185,0.56771,rect,0.09259,0.05208"
		overlay1_desc17_overlay = R2.png
		overlay1_desc18 = "menu_toggle,0.35,0.55,radial,0.04633,0.02604"
		overlay1_desc18_overlay = rgui.png
		overlay1_desc19 = "overlay_next,0.65,0.55,radial,0.04633,0.02604"
		overlay1_desc19_overlay = rotate.png
		overlay1_desc19_next_target = "landscape"`.replace(/(\n)\s+/g, "$1");
}