const Component = class {

    constructor(url) {
        this.url = url;
    }

    //リンク先のサイト
    site() {
        return 'https://www.by-the-sea.info/SHOP/' + this.url + '.html';
    }

    //現在のリングの画像と値段
    itemComponent(state) {
        return (`
            <h2 class="kanseiImage">完成イメージ</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
            <img src="https://www.by-the-sea.info/images/item/` + state.url + `.jpg" height="250px" class="sp_only">
            <img src="https://www.by-the-sea.info/images/item/` + state.url + `.jpg" width="100%" class="pc_only">
            <p class="sp_price"><span>` + Number(state.price).toLocaleString() + `</span>円(税込)</p>
            `);
    }

    //現在の選択中のリングの情報
    statusComponent(state) {
        return (`
            <ul class="status">
                <li>地金：` + state.material + `</li>
                <li>幅：` + state.width + `</li>
                <li>厚み：` + state.thick + `</li>
                <li>彫り：` + state.cave + `</li>
                <li>エッジ：` + state.edge + `</li>
                <li>形状：` + state.type + `</li>
            </ul>
            <p class="price"><span>` + Number(state.price).toLocaleString() + `</span>円（税込）</p>
            `);
    }

    //選択ボタンをまとめる
    joinComponent(array) {
        return (`
        <div class="selects">
            <h2><span class="step">STEP1</span>地金を選ぶ</h2>
            <ul class="horizontal_scroll">` + array.join('') + `</ul>
        </div>
        `);
    }

    //選択するボタン
    buttonComponent(content, difference) {
        return (`
                <li onclick="change('`+ this.url + `')">
                    <img src="https://www.by-the-sea.info/images/ordermade/`+ this.buttonImage(content) + `.webp">
                    <p>`+ content + `</p>
                    <span>`+ difference + `</span>
                </li>
                `);
    }

    //選択できない時用のボタン
    disabledComponent(content, error) {
        return (`
            <li>
                <img src="https://www.by-the-sea.info/images/ordermade/`+ this.buttonImage(content) + `.webp">
                <p>`+ content + `</p>
                <span style="color: #FF0000;">`+ error + `</span>
            </li>
        `);
    }

    //ボタン画像の切替
    buttonImage(content) {
        switch (content) {
            case '14Kイエローゴールド':
                return 'yellow';
            case '14Kピンクゴールド':
                return 'pink';
            case '14Kホワイトゴールド':
                return 'white';
            case '14Kグリーンゴールド':
                return 'green';
            case 'シルバー925':
                return 'silver';
            case 'フラット':
                return 'flat';
            case 'バレル':
                return 'barrel';
            case '幅4mm':
                return '4mm';
            case '幅6mm':
                return '6mm';
            case '幅8mm':
                return '8mm';
            case '厚み1.2mm':
                return '1.2mm';
            case '厚み1.5mm':
                return '1.5mm';
            case '厚み2mm':
                return '2mm';
            case 'スクロール':
                return 'scroll';
            case 'マイレリーフ':
                return 'maile';
            case 'マイレ＆カレイキニ':
                return 'maile_karei';
            case 'プルメリア':
                return 'plumeria';
            case 'カレイキニ':
                return 'kareikini';
            case 'カットアウト':
                return 'cutout';
            case 'プレーン':
                return 'plane';
            case 'ダイヤモンドカット':
                return 'diacut';
            case 'コインエッジ':
                return 'coinedge';
            case 'ノーエッジ':
                return 'noedge';
            default:
                return '';
        }
    }

}