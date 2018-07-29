<?php

// register webpack stylesheet and js with theme
$cssFilePath = glob( get_template_directory() . '/build/css/app.min.*' );
$cssFileURI = get_template_directory_uri() . '/build/css/' . basename($cssFilePath[0]);
wp_enqueue_style( 'app_css', $cssFileURI );
$jsFilePath = glob( get_template_directory() . '/build/js/app.min.*.js' );
$jsFileURI = get_template_directory_uri() . '/build/js/' . basename($jsFilePath[0]);
wp_enqueue_script( 'app_js', $jsFileURI , null , null , true );
