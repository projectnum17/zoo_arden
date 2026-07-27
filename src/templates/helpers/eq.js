module.exports = function (a, b) {
    return a === b;
};

// EXAMPLE (билдер для активности страниц)
{
    /* <nav class="nav-panel">
    <ul>
        {{#each menuInfo.menuHeader}}
        <li>
            <a href="{{url}}" class="{{#if (eq id @root.pageId)}}is-active{{/if}}">
                <span>{{title}}</span>
                <span>{{title}}</span>
            </a>
            {{#if submenu}}
            <ul>
                {{#each submenu}}
                <li>
                    <a href="{{url}}">
                        {{title}}
                        <span></span>
                    </a>
                </li>
                {{/each}}
            </ul>
            {{/if}}
        </li>
        {{/each}}
    </ul>
</nav> */
}
{
    /*
{
    "menuHeader": [
        { "title": "Про нас", "url": "about.html", "id": "about" },
        { "title": "Сервіси", "url": "services.html", "id": "services" },
        {
            "title": "Прайс",
            "id": "price",
            "url": "#!",
            "submenu": [
                { "title": "Прайс Послуги", "url": "price.html#services", "id": "price"},
                { "title": "Прайс Запчастини", "url": "price.html#spare", "id": "price"}
            ]
        },
        { "title": "Бренди", "url": "brands.html", "id": "brands" },
        { "title": "Контакти", "url": "contacts.html", "id": "contacts" }
    ],
    "menuFooter": [
        {"title": "Про нас", "url": "#!"},
        {"title": "Сервіси", "url": "#!"},
        {"title": "Прайс", "url": "#!"},
        {"title": "Блог", "url": "#!"},
        {"title": "Відгуки", "url": "#!"},
        {"title": "Бренди", "url": "#!"},
        {"title": "FAQ", "url": "#!"},
        {"title": "Контакти", "url": "#!"},
        {"title": "Умови сервісу", "url": "#!"}
    ]
}

*/
}

{
/*
    ---
    layout: default
    pageName: Про нас
    pageDescription: Про нас
    pageId: about
    breadcrumbs:
    - { title: "Головна", url: "/" }
    - { title: "Про нас", url: "/about.html" }
    ---

    {{> _about}}
    {{> _control}}
    {{> _innovation}}
    {{> _standart}}
    {{> _testimonials}}
    {{> _actual}}
*/
}
