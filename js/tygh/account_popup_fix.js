(function (_, $) {

    function closeAllDropdowns() {
        // Прячем любые открытые dropdown-контейнеры
        $('.ty-dropdown-box__content:visible, .cm-popup-box:visible').hide();

        // Убираем overlay (иногда их бывает несколько)
        $('.cm-popup-box-overlay').remove();

        // Снимаем классы, которые держат "режим popup"
        $('body')
            .removeClass('cm-popup-open')
            .removeClass('ty-dropdown-open')
            .removeClass('cm-popup-box-overlay-open');
    }

    function bindOnce() {
        if (window.__revoltp_account_popup_fix_bound) {
            return;
        }
        window.__revoltp_account_popup_fix_bound = true;

        // 1) Любой элемент, который открывает диалог (login/register в CS-Cart почти всегда так сделан)
        $(document).on('click', '.cm-dialog-opener', function () {
            closeAllDropdowns();
        });

        // 2) Любые ссылки/кнопки логина/регистрации/профиля внутри выпадающего "Мой аккаунт"
        $(document).on('click', '.ty-dropdown-box__content a, .cm-popup-box a, .ty-dropdown-box__content button, .cm-popup-box button', function () {
            var $el = $(this);

            // href может отсутствовать (кнопка)
            var href = ($el.attr('href') || '').toString();

            // Триггеры, которые у тебя как раз и открывают второе окно
            // (покрываем разные варианты CS-Cart)
            if (
                $el.hasClass('cm-dialog-opener') ||
                href.indexOf('dispatch=auth.login_form') !== -1 ||
                href.indexOf('dispatch=profiles.add') !== -1 ||
                href.indexOf('dispatch=profiles.update') !== -1 ||
                href.indexOf('dispatch=profiles.login') !== -1 ||
                href.indexOf('dispatch=companies.apply_for_vendor') !== -1
            ) {
                closeAllDropdowns();
            }
        });

        // 3) Если “Войти” запускается submit-ом (не ссылкой) — закрываем ДО сабмита
        $(document).on('submit', 'form', function () {
            // Закроем dropdown только если он реально открыт
            if ($('.ty-dropdown-box__content:visible, .cm-popup-box:visible').length) {
                closeAllDropdowns();
            }
        });
    }

    // На всякий случай — и при загрузке, и при ajax-инициализациях
    $(bindOnce);
    $.ceEvent('on', 'ce.commoninit', bindOnce);

}(Tygh, Tygh.$));
