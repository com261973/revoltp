<?php

defined('BOOTSTRAP') or die('Access denied');

// TID 101842552
function fn_my_changes_get_products_layout_post(&$selected_view, $params)
{
    if (
        empty($params['layout']) 
        && isset($params['dispatch']) 
        && $params['dispatch'] == 'products.search'
    ) {
        $selected_view = 'products_without_options';
    }
}

function fn_revoltp_get_vendor_user($company_id)
{
    if (empty($company_id)) {
        return [];
    }

    return db_get_row("
        SELECT user_id, firstname, lastname, email
        FROM ?:users
        WHERE company_id = ?i
        AND user_type = 'V'
        ORDER BY user_id ASC
        LIMIT 1
    ", $company_id);
}
