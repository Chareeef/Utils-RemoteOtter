const countries = [
    { id: "ad", name: "Andorra", region: "EMEA", continent: "Europe" },
    { id: "ae", name: "United Arab Emirates", region: "EMEA", continent: "Asia" },
    { id: "af", name: "Afghanistan", region: "EMEA", continent: "Asia" },
    {
        id: "ag",
        name: "Antigua and Barbuda",
        region: "LATAM",
        continent: "Northern America",
    },
    {
        id: "ai",
        name: "Anguilla",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "al", name: "Albania", region: "EMEA", continent: "Europe" },
    { id: "am", name: "Armenia", region: "EMEA", continent: "Asia" },
    { id: "ao", name: "Angola", region: "EMEA", continent: "Africa" },
    { id: "aq", name: "Antarctica", region: "EMEA", continent: "Antarctica" },
    { id: "ar", name: "Argentina", region: "LATAM", continent: "South America" },
    { id: "as", name: "American Samoa", region: "APAC", continent: "Oceania" },
    { id: "at", name: "Austria", region: "EMEA", continent: "Europe" },
    { id: "au", name: "Australia", region: "APAC", continent: "Oceania" },
    { id: "aw", name: "Aruba", region: "LATAM", continent: "Northern America" },
    { id: "ax", name: "Åland Islands", region: "EMEA", continent: "Europe" },
    { id: "az", name: "Azerbaijan", region: "EMEA", continent: "Asia" },
    {
        id: "ba",
        name: "Bosnia and Herzegovina",
        region: "EMEA",
        continent: "Europe",
    },
    {
        id: "bb",
        name: "Barbados",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "bd", name: "Bangladesh", region: "APAC", continent: "Asia" },
    { id: "be", name: "Belgium", region: "EMEA", continent: "Europe" },
    { id: "bf", name: "Burkina Faso", region: "EMEA", continent: "Africa" },
    { id: "bg", name: "Bulgaria", region: "EMEA", continent: "Europe" },
    { id: "bh", name: "Bahrain", region: "EMEA", continent: "Asia" },
    { id: "bi", name: "Burundi", region: "EMEA", continent: "Africa" },
    { id: "bj", name: "Benin", region: "EMEA", continent: "Africa" },
    {
        id: "bl",
        name: "Saint Barthélemy",
        region: "EMEA",
        continent: "Northern America",
    },
    { id: "bm", name: "Bermuda", region: "LATAM", continent: "Northern America" },
    { id: "bn", name: "Brunei Darussalam", region: "APAC", continent: "Asia" },
    {
        id: "bo",
        name: "Bolivia, Plurinational State of",
        region: "LATAM",
        continent: "South America",
    },
    { id: "br", name: "Brazil", region: "LATAM", continent: "South America" },
    { id: "bs", name: "Bahamas", region: "LATAM", continent: "Northern America" },
    { id: "bt", name: "Bhutan", region: "APAC", continent: "Asia" },
    { id: "bv", name: "Bouvet Island", region: "EMEA", continent: "Antarctica" },
    { id: "bw", name: "Botswana", region: "EMEA", continent: "Africa" },
    { id: "by", name: "Belarus", region: "EMEA", continent: "Europe" },
    { id: "bz", name: "Belize", region: "LATAM", continent: "Northern America" },
    { id: "ca", name: "Canada", region: "NA", continent: "Northern America" },
    {
        id: "cc",
        name: "Cocos (Keeling) Islands",
        region: "APAC",
        continent: "Asia",
    },
    {
        id: "cd",
        name: "Congo, the Democratic Republic of the",
        region: "EMEA",
        continent: "Africa",
    },
    {
        id: "cf",
        name: "Central African Republic",
        region: "EMEA",
        continent: "Africa",
    },
    { id: "cg", name: "Congo", region: "EMEA", continent: "Africa" },
    { id: "ch", name: "Switzerland", region: "EMEA", continent: "Europe" },
    { id: "ci", name: "Côte d'Ivoire", region: "EMEA", continent: "Africa" },
    { id: "ck", name: "Cook Islands", region: "EMEA", continent: "Oceania" },
    { id: "cl", name: "Chile", region: "LATAM", continent: "South America" },
    { id: "cm", name: "Cameroon", region: "EMEA", continent: "Africa" },
    { id: "cn", name: "China", region: "APAC", continent: "Asia" },
    { id: "co", name: "Colombia", region: "LATAM", continent: "South America" },
    {
        id: "cr",
        name: "Costa Rica",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "cu", name: "Cuba", region: "LATAM", continent: "Northern America" },
    { id: "cv", name: "Cabo Verde", region: "EMEA", continent: "Africa" },
    { id: "cw", name: "Curaçao", region: "EMEA", continent: "Northern America" },
    { id: "cx", name: "Christmas Island", region: "APAC", continent: "Asia" },
    { id: "cy", name: "Cyprus", region: "EMEA", continent: "Asia" },
    { id: "cz", name: "Czechia", region: "EMEA", continent: "Europe" },
    { id: "de", name: "Germany", region: "EMEA", continent: "Europe" },
    { id: "dj", name: "Djibouti", region: "EMEA", continent: "Africa" },
    { id: "dk", name: "Denmark", region: "EMEA", continent: "Europe" },
    {
        id: "dm",
        name: "Dominica",
        region: "LATAM",
        continent: "Northern America",
    },
    {
        id: "do",
        name: "Dominican Republic",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "dz", name: "Algeria", region: "EMEA", continent: "Africa" },
    { id: "ec", name: "Ecuador", region: "LATAM", continent: "South America" },
    { id: "ee", name: "Estonia", region: "EMEA", continent: "Europe" },
    { id: "eg", name: "Egypt", region: "EMEA", continent: "Africa" },
    { id: "eh", name: "Western Sahara", region: "EMEA", continent: "Africa" },
    { id: "er", name: "Eritrea", region: "EMEA", continent: "Africa" },
    { id: "es", name: "Spain", region: "EMEA", continent: "Europe" },
    { id: "et", name: "Ethiopia", region: "EMEA", continent: "Africa" },
    { id: "fi", name: "Finland", region: "EMEA", continent: "Europe" },
    { id: "fj", name: "Fiji", region: "APAC", continent: "Oceania" },
    {
        id: "fk",
        name: "Falkland Islands (Malvinas)",
        region: "LATAM",
        continent: "South America",
    },
    {
        id: "fm",
        name: "Micronesia, Federated States of",
        region: "APAC",
        continent: "Oceania",
    },
    { id: "fo", name: "Faroe Islands", region: "EMEA", continent: "Europe" },
    { id: "fr", name: "France", region: "EMEA", continent: "Europe" },
    { id: "ga", name: "Gabon", region: "EMEA", continent: "Africa" },
    { id: "gb", name: "UK United Kingdom", region: "EMEA", continent: "Europe" },
    { id: "gd", name: "Grenada", region: "LATAM", continent: "Northern America" },
    { id: "ge", name: "Georgia", region: "EMEA", continent: "Asia" },
    {
        id: "gf",
        name: "French Guiana",
        region: "EMEA",
        continent: "South America",
    },
    { id: "gg", name: "Guernsey", region: "EMEA", continent: "Europe" },
    { id: "gh", name: "Ghana", region: "EMEA", continent: "Africa" },
    { id: "gi", name: "Gibraltar", region: "EMEA", continent: "Europe" },
    {
        id: "gl",
        name: "Greenland",
        region: "EMEA",
        continent: "Northern America",
    },
    { id: "gm", name: "Gambia", region: "EMEA", continent: "Africa" },
    { id: "gn", name: "Guinea", region: "EMEA", continent: "Africa" },
    {
        id: "gp",
        name: "Guadeloupe",
        region: "EMEA",
        continent: "Northern America",
    },
    { id: "gq", name: "Equatorial Guinea", region: "EMEA", continent: "Africa" },
    { id: "gr", name: "Greece", region: "EMEA", continent: "Europe" },
    {
        id: "gs",
        name: "South Georgia and the South Sandwich Islands",
        region: "LATAM",
        continent: "South America",
    },
    {
        id: "gt",
        name: "Guatemala",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "gu", name: "Guam", region: "APAC", continent: "Oceania" },
    { id: "gw", name: "Guinea-Bissau", region: "EMEA", continent: "Africa" },
    { id: "gy", name: "Guyana", region: "LATAM", continent: "South America" },
    { id: "hk", name: "Hong Kong", region: "APAC", continent: "Asia" },
    {
        id: "hm",
        name: "Heard Island and McDonald Islands",
        region: "EMEA",
        continent: "Oceania",
    },
    {
        id: "hn",
        name: "Honduras",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "hr", name: "Croatia", region: "EMEA", continent: "Europe" },
    { id: "ht", name: "Haiti", region: "LATAM", continent: "Northern America" },
    { id: "hu", name: "Hungary", region: "EMEA", continent: "Europe" },
    { id: "id", name: "Indonesia", region: "APAC", continent: "Asia" },
    { id: "ie", name: "Ireland", region: "EMEA", continent: "Europe" },
    { id: "il", name: "Israel", region: "EMEA", continent: "Asia" },
    { id: "im", name: "Isle of Man", region: "EMEA", continent: "Europe" },
    { id: "in", name: "India", region: "APAC", continent: "Asia" },
    {
        id: "io",
        name: "British Indian Ocean Territory",
        region: "APAC",
        continent: "Asia",
    },
    { id: "iq", name: "Iraq", region: "EMEA", continent: "Asia" },
    {
        id: "ir",
        name: "Iran, Islamic Republic of",
        region: "EMEA",
        continent: "Asia",
    },
    { id: "is", name: "Iceland", region: "EMEA", continent: "Europe" },
    { id: "it", name: "Italy", region: "EMEA", continent: "Europe" },
    { id: "je", name: "Jersey", region: "EMEA", continent: "Europe" },
    { id: "jm", name: "Jamaica", region: "LATAM", continent: "Northern America" },
    { id: "jo", name: "Jordan", region: "EMEA", continent: "Asia" },
    { id: "jp", name: "Japan", region: "APAC", continent: "Asia" },
    { id: "ke", name: "Kenya", region: "EMEA", continent: "Africa" },
    { id: "kg", name: "Kyrgyzstan", region: "EMEA", continent: "Asia" },
    { id: "kh", name: "Cambodia", region: "APAC", continent: "Asia" },
    { id: "ki", name: "Kiribati", region: "APAC", continent: "Oceania" },
    { id: "km", name: "Comoros", region: "EMEA", continent: "Africa" },
    {
        id: "kn",
        name: "Saint Kitts and Nevis",
        region: "LATAM",
        continent: "Northern America",
    },
    {
        id: "kp",
        name: "Korea, Democratic People's Republic of",
        region: "APAC",
        continent: "Asia",
    },
    { id: "kr", name: "Korea, Republic of", region: "APAC", continent: "Asia" },
    { id: "kw", name: "Kuwait", region: "EMEA", continent: "Asia" },
    {
        id: "ky",
        name: "Cayman Islands",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "kz", name: "Kazakhstan", region: "EMEA", continent: "Asia" },
    {
        id: "la",
        name: "Lao People's Democratic Republic",
        region: "APAC",
        continent: "Asia",
    },
    { id: "lb", name: "Lebanon", region: "EMEA", continent: "Asia" },
    {
        id: "lc",
        name: "Saint Lucia",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "li", name: "Liechtenstein", region: "EMEA", continent: "Europe" },
    { id: "lk", name: "Sri Lanka", region: "APAC", continent: "Asia" },
    { id: "lr", name: "Liberia", region: "EMEA", continent: "Africa" },
    { id: "ls", name: "Lesotho", region: "EMEA", continent: "Africa" },
    { id: "lt", name: "Lithuania", region: "EMEA", continent: "Europe" },
    { id: "lu", name: "Luxembourg", region: "EMEA", continent: "Europe" },
    { id: "lv", name: "Latvia", region: "EMEA", continent: "Europe" },
    { id: "ly", name: "Libya", region: "EMEA", continent: "Africa" },
    { id: "ma", name: "Morocco", region: "EMEA", continent: "Africa" },
    { id: "mc", name: "Monaco", region: "EMEA", continent: "Europe" },
    {
        id: "md",
        name: "Moldova, Republic of",
        region: "EMEA",
        continent: "Europe",
    },
    { id: "me", name: "Montenegro", region: "EMEA", continent: "Europe" },
    {
        id: "mf",
        name: "Collectivity of Saint Martin",
        region: "EMEA",
        continent: "Northern America",
    },
    { id: "mg", name: "Madagascar", region: "EMEA", continent: "Africa" },
    { id: "mh", name: "Marshall Islands", region: "APAC", continent: "Oceania" },
    {
        id: "mk",
        name: "Macedonia, the former Yugoslav Republic of",
        region: "EMEA",
        continent: "Europe",
    },
    { id: "ml", name: "Mali", region: "EMEA", continent: "Africa" },
    { id: "mm", name: "Myanmar", region: "APAC", continent: "Asia" },
    { id: "mn", name: "Mongolia", region: "APAC", continent: "Asia" },
    { id: "mo", name: "Macao", region: "APAC", continent: "Asia" },
    {
        id: "mp",
        name: "Northern Mariana Islands",
        region: "APAC",
        continent: "Oceania",
    },
    {
        id: "mq",
        name: "Martinique",
        region: "EMEA",
        continent: "Northern America",
    },
    { id: "mr", name: "Mauritania", region: "EMEA", continent: "Africa" },
    {
        id: "ms",
        name: "Montserrat",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "mt", name: "Malta", region: "EMEA", continent: "Europe" },
    { id: "mu", name: "Mauritius", region: "EMEA", continent: "Africa" },
    { id: "mv", name: "Maldives", region: "APAC", continent: "Asia" },
    { id: "mw", name: "Malawi", region: "EMEA", continent: "Africa" },
    { id: "mx", name: "Mexico", region: "LATAM", continent: "Northern America" },
    { id: "my", name: "Malaysia", region: "APAC", continent: "Asia" },
    { id: "mz", name: "Mozambique", region: "EMEA", continent: "Africa" },
    { id: "na", name: "Namibia", region: "EMEA", continent: "Africa" },
    { id: "nc", name: "New Caledonia", region: "EMEA", continent: "Oceania" },
    { id: "ne", name: "Niger", region: "EMEA", continent: "Africa" },
    { id: "nf", name: "Norfolk Island", region: "APAC", continent: "Oceania" },
    { id: "ng", name: "Nigeria", region: "EMEA", continent: "Africa" },
    {
        id: "ni",
        name: "Nicaragua",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "nl", name: "Netherlands", region: "EMEA", continent: "Europe" },
    { id: "no", name: "Norway", region: "EMEA", continent: "Europe" },
    { id: "np", name: "Nepal", region: "APAC", continent: "Asia" },
    { id: "nr", name: "Nauru", region: "APAC", continent: "Oceania" },
    { id: "nu", name: "Niue", region: "APAC", continent: "Oceania" },
    { id: "nz", name: "New Zealand", region: "APAC", continent: "Oceania" },
    { id: "om", name: "Oman", region: "EMEA", continent: "Asia" },
    { id: "pa", name: "Panama", region: "LATAM", continent: "Northern America" },
    { id: "pe", name: "Peru", region: "LATAM", continent: "South America" },
    { id: "pf", name: "French Polynesia", region: "EMEA", continent: "Oceania" },
    { id: "pg", name: "Papua New Guinea", region: "APAC", continent: "Oceania" },
    { id: "ph", name: "Philippines", region: "APAC", continent: "Asia" },
    { id: "pk", name: "Pakistan", region: "APAC", continent: "Asia" },
    { id: "pl", name: "Poland", region: "EMEA", continent: "Europe" },
    {
        id: "pm",
        name: "Saint Pierre and Miquelon",
        region: "EMEA",
        continent: "Northern America",
    },
    { id: "pn", name: "Pitcairn", region: "APAC", continent: "Oceania" },
    {
        id: "pr",
        name: "Puerto Rico",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "ps", name: "Palestine, State of", region: "EMEA", continent: "Asia" },
    { id: "pt", name: "Portugal", region: "EMEA", continent: "Europe" },
    { id: "pw", name: "Palau", region: "APAC", continent: "Oceania" },
    { id: "py", name: "Paraguay", region: "LATAM", continent: "South America" },
    { id: "qa", name: "Qatar", region: "EMEA", continent: "Asia" },
    { id: "re", name: "Réunion", region: "EMEA", continent: "Africa" },
    { id: "ro", name: "Romania", region: "EMEA", continent: "Europe" },
    { id: "rs", name: "Serbia", region: "EMEA", continent: "Europe" },
    { id: "ru", name: "Russian Federation", region: "EMEA", continent: "Europe" },
    { id: "rw", name: "Rwanda", region: "EMEA", continent: "Africa" },
    { id: "sa", name: "Saudi Arabia", region: "EMEA", continent: "Asia" },
    { id: "sb", name: "Solomon Islands", region: "APAC", continent: "Oceania" },
    { id: "sc", name: "Seychelles", region: "EMEA", continent: "Africa" },
    { id: "sd", name: "Sudan", region: "EMEA", continent: "Africa" },
    { id: "se", name: "Sweden", region: "EMEA", continent: "Europe" },
    { id: "sg", name: "Singapore", region: "APAC", continent: "Asia" },
    {
        id: "sh",
        name: "Saint Helena, Ascension and Tristan da Cunha",
        region: "EMEA",
        continent: "Africa",
    },
    { id: "si", name: "Slovenia", region: "EMEA", continent: "Europe" },
    {
        id: "sj",
        name: "Svalbard and Jan Mayen",
        region: "EMEA",
        continent: "Europe",
    },
    { id: "sk", name: "Slovakia", region: "EMEA", continent: "Europe" },
    { id: "sl", name: "Sierra Leone", region: "EMEA", continent: "Africa" },
    { id: "sm", name: "San Marino", region: "EMEA", continent: "Europe" },
    { id: "sn", name: "Senegal", region: "EMEA", continent: "Africa" },
    { id: "so", name: "Somalia", region: "EMEA", continent: "Africa" },
    { id: "sr", name: "Suriname", region: "LATAM", continent: "South America" },
    { id: "ss", name: "South Sudan", region: "EMEA", continent: "Africa" },
    {
        id: "st",
        name: "Sao Tome and Principe",
        region: "EMEA",
        continent: "Africa",
    },
    {
        id: "sv",
        name: "El Salvador",
        region: "LATAM",
        continent: "Northern America",
    },
    {
        id: "sx",
        name: "Sint Maarten (Dutch part)",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "sy", name: "Syrian Arab Republic", region: "EMEA", continent: "Asia" },
    { id: "sz", name: "Swaziland", region: "EMEA", continent: "Africa" },
    {
        id: "tc",
        name: "Turks and Caicos Islands",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "td", name: "Chad", region: "EMEA", continent: "Africa" },
    {
        id: "tf",
        name: "French Southern Territories",
        region: "EMEA",
        continent: "Antarctica",
    },
    { id: "tg", name: "Togo", region: "EMEA", continent: "Africa" },
    { id: "th", name: "Thailand", region: "APAC", continent: "Asia" },
    { id: "tj", name: "Tajikistan", region: "EMEA", continent: "Asia" },
    { id: "tk", name: "Tokelau", region: "APAC", continent: "Oceania" },
    { id: "tl", name: "Timor-Leste", region: "APAC", continent: "Asia" },
    { id: "tm", name: "Turkmenistan", region: "EMEA", continent: "Asia" },
    { id: "tn", name: "Tunisia", region: "EMEA", continent: "Africa" },
    { id: "to", name: "Tonga", region: "APAC", continent: "Oceania" },
    { id: "tr", name: "Turkey", region: "EMEA", continent: "Asia" },
    {
        id: "tt",
        name: "Trinidad and Tobago",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "tv", name: "Tuvalu", region: "APAC", continent: "Oceania" },
    {
        id: "tw",
        name: "Taiwan, Province of China",
        region: "APAC",
        continent: "Asia",
    },
    {
        id: "tz",
        name: "Tanzania, United Republic of",
        region: "EMEA",
        continent: "Africa",
    },
    { id: "ua", name: "Ukraine", region: "EMEA", continent: "Europe" },
    { id: "ug", name: "Uganda", region: "EMEA", continent: "Africa" },
    {
        id: "um",
        name: "United States Minor Outlying Islands",
        region: "APAC",
        continent: "Oceania",
    },
    {
        id: "us",
        name: "USA",
        region: "NA",
        continent: "Northern America",
    },
    { id: "uy", name: "Uruguay", region: "LATAM", continent: "South America" },
    { id: "uz", name: "Uzbekistan", region: "EMEA", continent: "Asia" },
    {
        id: "va",
        name: "Holy See (Vatican City State)",
        region: "EMEA",
        continent: "Europe",
    },
    {
        id: "vc",
        name: "Saint Vincent and the Grenadines",
        region: "LATAM",
        continent: "Northern America",
    },
    {
        id: "ve",
        name: "Venezuela, Bolivarian Republic of",
        region: "LATAM",
        continent: "South America",
    },
    {
        id: "vg",
        name: "Virgin Islands, British",
        region: "LATAM",
        continent: "Northern America",
    },
    {
        id: "vi",
        name: "Virgin Islands, U.S.",
        region: "LATAM",
        continent: "Northern America",
    },
    { id: "vn", name: "Viet Nam", region: "APAC", continent: "Asia" },
    { id: "vu", name: "Vanuatu", region: "APAC", continent: "Oceania" },
    { id: "wf", name: "Wallis and Futuna", region: "APAC", continent: "Oceania" },
    { id: "ws", name: "Samoa", region: "APAC", continent: "Oceania" },
    { id: "ye", name: "Yemen", region: "EMEA", continent: "Asia" },
    { id: "yt", name: "Mayotte", region: "EMEA", continent: "Africa" },
    { id: "za", name: "South Africa", region: "EMEA", continent: "Africa" },
    { id: "zm", name: "Zambia", region: "EMEA", continent: "Africa" },
    { id: "zw", name: "Zimbabwe", region: "EMEA", continent: "Africa" },

    // Worldwide
    { id: "ww", name: "Worldwide", region: "Anywhere", continent: "World" },
];

module.exports = countries;