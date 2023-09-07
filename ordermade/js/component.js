const Component = class {

    constructor(state) {
        this.state = state;
    }

    //リンク先のサイト
    site() {
        return 'https://www.by-the-sea.info/SHOP/' + this.state.url + '.html';
    }

    //現在のリングの画像と値段
    itemComponent() {
        return (`
                <h2 class="kanseiImage">完成イメージ</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
                <img src="ordermade/images/item_lording.gif" data-src="https://www.by-the-sea.info/images/item/ordermade/` + this.state.url + `.webp" height="250px" class="lazyload sp_only">
                <img src="ordermade/images/item_lording.gif" data-src="https://www.by-the-sea.info/images/item/ordermade/` + this.state.url + `.webp" width="100%" class="lazyload pc_only">
                <p class="sp_price"><span>` + Number(this.state.price).toLocaleString() + `</span>円(税込)</p>
                `);
    }

    //現在の選択中のリングの情報
    statusComponent() {
        return (`
            <ul class="status">
                <li>地金：` + this.state.material + `</li>
                <li>幅：` + this.state.width + `</li>
                <li>厚み：` + this.state.thick + `</li>
                <li>彫り：` + this.state.cave + `</li>
                <li>エッジ：` + this.state.edge + `</li>
                <li>形状：` + this.state.type + `</li>
            </ul>
            <p class="price"><span>` + Number(this.state.price).toLocaleString() + `</span>円（税込）</p>
            <p style="font-size:12px; margin-bottom:30px;">※完成イメージは合成画像のため、実際の商品とは色合い・彫り・デザインが多少異なる場合がございます。予めご了承下さい。</p>
            `);
    }

    //選択ボタンをまとめる
    joinComponent(array, string) {

        const nextStep = (next) => {
            return (`
                    <div align="center" onclick="tab('`+ next + `')" >
                            <div class="next_step">次のSTEPへ
                                <span class="u-icon--arrow-right"></span>
                            </div>
                    </div>
                    `);
        }

        const tubContent = (prop) => {
            switch (prop) {
                case 'material':
                    return {
                        step: 'STEP1',
                        title: '地金を選ぶ',
                        content: nextStep('.widthComponent')
                    }
                case 'width':
                    return {
                        step: 'STEP2',
                        title: '幅を選ぶ',
                        content: nextStep('.thickComponent')
                    }
                case 'thick':
                    return {
                        step: 'STEP3',
                        title: '厚みを選ぶ',
                        content: nextStep('.caveComponent')
                    }
                case 'cave':
                    return {
                        step: 'STEP4',
                        title: '彫りを選ぶ',
                        content: nextStep('.edgeComponent')
                    }
                case 'edge':
                    return {
                        step: 'STEP5',
                        title: 'エッジ（縁）を選ぶ',
                        content: nextStep('.typeComponent')
                    }
                case 'type':
                    return {
                        step: 'STEP6',
                        title: '形状を選ぶ',
                        content:
                            `
                            <h3>バレルとフラットのリング断面図</h3>
                            <div class="margin_bottom_10"></div>
                            <p class="ex">バレルはフラットから角をとっているため柔らかな印象ですが、同じ厚みでもフラットの方より厚い印象に仕上がります。</p>
                            <table border="0" cellspacing="10" style="text-align:center;">
                                <tbody>
                                    <tr>
                                        <td>バレルの断面図<img src="https://www.by-the-sea.info/images/ordermade/barrel_.webp"
                                                width="100%"></td>
                                        <td>フラットの断面図<img src="https://www.by-the-sea.info/images/ordermade/flat_.webp"
                                                width="100%">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <span class="pc_only"><br><br>`+ this.buyComponent() + `</span>
                            `,
                    }
            }
        }
        return (`
        <div class="selects">
            <h2><span class="step">` + tubContent(string).step + `</span>` + tubContent(string).title + `</h2>
            <ul class="horizontal_scroll">` + array.join('') + `</ul>
            ` + tubContent(string).content + `
        </div>
        `);

    }


    //選択するボタン
    buttonComponent(url, content, difference) {
        return (`
                <li onclick="change('`+ url + `')" ` + this.buttonSelected(url) + ` class="active">
                    <img src="ordermade/images/button_skelton.jpg" data-src="https://www.by-the-sea.info/images/ordermade/`+ this.buttonImage(content) + `.webp" class="lazyload">
                    <p>`+ content + `</p>
                    <p class="ex">`+ this.subContent(content) + `</p>
                    <span>`+ difference + `</span>
                </li>
                `);
    }

    //選択できない時用のボタン
    disabledComponent(url, content, error) {
        return (`
            <li  ` + this.buttonSelected(url) + `>
                <img src="ordermade/images/button_skelton.jpg" data-src="https://www.by-the-sea.info/images/ordermade/`+ this.buttonImage(content) + `.webp" style="opacity: 0.2;" class="lazyload">
                <p>`+ content + `</p>
                <p class="ex">`+ this.subContent(content) + `</p>
                <span style="color: #FF0000;">`+ error + `</span>
            </li>
        `);
    }

    //選択中のボタン
    buttonSelected(url) {
        if (url == this.state.url) {
            return 'class="selected"'
        }
        else {
            return '';
        }
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

    //ボタンのサブコンテンツ
    subContent(content) {
        switch (content) {
            case 'フラット':
                return '表面が平らなタイプ。厚みが強調されより重厚で立体的な印象に仕上がります。';
            case 'バレル':
                return '付け心地のよい丸みを帯びた樽型。フラットより地金量が少ないためよりリーズナブルです。';
            case 'スクロール':
                return '永遠に途切れることのない愛を意味します。';
            case 'マイレリーフ':
                return '大切な人との絆を意味する神聖な葉のモチーフです。';
            case 'マイレ＆カレイキニ':
                return 'スクロールとマイレリーフの両方が楽しめます。';
            case 'プルメリア':
                return '大切な人の幸せを願う意味が込められております。';
            case 'カレイキニ':
                return '力強い波を表現することから「パワー」を意味します。';
            case 'カットアウト':
                return '柄に沿って縁をカットしており彫りが強調されます。';
            case 'プレーン':
                return '両サイドに柄が入っていないラインが入ります。';
            case 'ダイヤモンドカット':
                return '両サイドに細かくカットを施します。';
            case 'コインエッジ':
                return '両サイドに硬貨の縁のような溝状の模様を施します。';
            case 'ノーエッジ':
                return 'エッジに加工を施さない、柄のみのシンプルなデザイン';
            default:
                return '';
        }
    }

    //購入ページのボタン
    buyComponent() {
        return (`
                <div align="center">
                    <a href="`+ this.site() + `" class="buy-btn">
                        購入ページへ
                    </a>
                </div>
            `);
    }
}