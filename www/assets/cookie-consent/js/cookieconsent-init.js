// obtain cookieconsent plugin
var cc = initCookieConsent();

// run plugin with config object
cc.run({
    current_lang: document.documentElement.getAttribute('lang'),
    autoclear_cookies: false,                   // default: false
    //theme_css: '../assets/cookie-consent/css/cookieconsent.css',
    cookie_name: 'cookie_consent',              // default: 'cc_cookie'
    cookie_expiration: 365,                     // default: 182
    page_scripts: true,                         // default: false
    force_consent: false,                       // default: false

    // auto_language: null,                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                           // default: true
    // delay: 0,                                // default: 0
    // hide_from_bots: false,                   // default: false
    // remove_cookie_tables: false              // default: false
    // cookie_domain: location.hostname,        // default: current domain
    // cookie_path: '/',                        // default: root
    // cookie_same_site: 'Lax',
    // use_rfc_cookie: false,                   // default: false
    // revision: 0,                             // default: 0

    gui_options: {
        consent_modal: {
            layout: 'cloud',                    // box,cloud,bar
            position: 'bottom center',          // bottom,middle,top + left,right,center
            transition: 'slide'                 // zoom,slide
        },
        settings_modal: {
            layout: 'box',                      // box,bar
            position: 'center',                   // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onAccept: function (cookie) {
    },

    onChange: function (cookie, changed_preferences) {
        // If analytics category's status was changed ...
        if (changed_preferences.indexOf('analytics') > -1) {

            // If analytics category is disabled ...
            if (!cc.allowedCategory('analytics')) {

                // Disable gtag ...
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                    dataLayer.push(arguments);
                }

                gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied'
                });
            }
        }
    },

    languages: {
        'cs': {
            consent_modal: {
                title: 'Freshbang pou????v?? cookies.',
                description: 'Jsou to mal?? soubory, d??ky kter??m v??m web nab??dne jen takov?? obsah, kter?? o??ek??v??te, nebude v??s obt????ovat v??cmi, kter?? v??s nezaj??maj?? a vy tak najdete to, co hled??te. Aby to tak opravdu bylo, pot??ebujeme od v??s souhlas s ukl??d??n??m cookies do va??eho prohl????e??e.',
                primary_btn: {
                    text: 'OK, souhlas??m',
                    role: 'accept_all'      //'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Nastaven??',
                    role: 'settings'       //'settings' or 'accept_necessary'
                },
                revision_message: '<br><br> V????en?? u??ivateli, smluvn?? podm??nky se od va???? posledn?? n??v??t??vy zm??nily!'
            },
            settings_modal: {
                title: 'Nastaven?? cookies',
                save_settings_btn: 'P??ijmout vybran??',
                accept_all_btn: 'P??ijmout v??e',
                reject_all_btn: 'Odm??tnout v??e',
                close_btn_label: 'Zav????t',
                blocks: [
                    {
                        title: 'K ??emu jsou dobr?? cookies?',
                        description: 'Cookies jsou mal?? textov?? soubory, kter?? mohou b??t pou????v??ny webov??mi str??nkami pro efektivn??j???? zobrazov??n?? toho, co v??s zaj??m??. <br><br> N??kter?? cookies jsou pou????v??ny samotnou webovou str??nkou, jin?? jsou um??st??ny t??et??mi stranami, jejich?? slu??by se na webu mohou objevovat. <br><br> Nov?? z??kon na??izuje, abychom pro pou??it?? webu od od ka??d??ho n??v??t??vn??ka z??skali souhlas s pou????v??n?? cookies v t??chto kategori??ch:'
                    }, {
                        title: 'Nezbytn?? soubory cookie',
                        description: 'Tyto soubory neukl??daj?? ????dn?? osobn?? identifikovateln?? informace, web je ale ke sv??mu fungov??n?? pot??ebuje. Nelze je vypnout.',
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true  //cookie categories with readonly=true are all treated as "necessary cookies"
                        }
                    }, {
                        title: 'Statistick?? soubory cookies',
                        description: 'Pro zlep??ov??n?? v??konu str??nky, sledov??n?? zdroj?? a po??tu n??v??t??vn??k?? webu vyu????v??me anonymizovan?? souhrnn?? statistick?? cookie.',
                        toggle: {
                            value: 'analytics',
                            enabled: false,
                            readonly: false
                        },
                    }, {
                        title: 'Marketingov?? soubory cookies',
                        description: 'Kv??li p??izp??soben?? povahy zobrazovan??ch reklam a naopak zabr??n??n?? zobrazov??n?? obsahu, kter?? pro v??s nen?? relevantn?? a nemusel by v??s zaj??mat, pot??ebujeme souhlas s marketingov??mi cookies. ',
                        toggle: {
                            value: 'targeting',
                            enabled: false,
                            readonly: false,
                            reload: 'on_disable'            // New option in v2.4, check readme.md
                        },
                    }
                ]
            }
        }
    }
});