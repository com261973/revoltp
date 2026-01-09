<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $mode == 'update') {
    if (!empty($_REQUEST['company_data']['company'] || $_REQUEST['company_data']['tax_number'])) {
        $company_name = $_REQUEST['company_data']['company'];
        $tax_number = $_REQUEST['company_data']['tax_number'];
        $company_id = $_REQUEST['user_data']['company_id'];

        $data = [
            'company' => $company_name,
            'tax_number' => $tax_number,
        ];

        fn_update_company($data, $company_id);
    }
}

if ($mode == 'update') {
    $user_data = Tygh::$app['view']->getTemplateVars('user_data');
    if (isset($user_data['company_id'])) {
        $c_data = db_get_row("SELECT company, tax_number FROM ?:companies WHERE company_id = ?i",$user_data['company_id']);

        Tygh::$app['view']->assign('company', $c_data);
    }
}
