<?php

defined('BOOTSTRAP') or die('Access denied');

fn_register_hooks(
    'get_products_layout_post',
    'get_cart_products_post',
    'get_cart_product_data_post',
    'block_checkout_cart_products_post'
);
