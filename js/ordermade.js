const jsonUrl = "js/list.json";

const getJson = (itemUrl) => {
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => formatJSON(data, itemUrl))
}

// 起動時の処理
window.addEventListener("load", getJson("yb4a-a"));

//各ボタンを押された時の処理
const change = (itemUrl) => { getJson(itemUrl); }

// jsonを整形して表示する
function formatJSON(json, itemUrl) {

    //json読み込み
    const getJson = json.filter(function (data) {
        return data.url == itemUrl;
    });

    //選択中の商品
    const state = getJson[0];

    //差額表示
    const differencePrice = (objectPrice) => {
        if (objectPrice - state.price >= 0) {
            return '+' + String((objectPrice - state.price).toLocaleString()) + '円';
        } else {
            return String((objectPrice - state.price).toLocaleString()) + '円';
        }
    }

    //素材に関する処理
    //jsonから必要なデータ取り出し
    const materials = json.filter(function (data) {
        return data.type == state.type && data.width == state.width && data.thick == state.thick && data.cave == state.cave && data.edge == state.edge;
    });
    //バリデーション＆コンポーネント呼び出し
    const materialComponent = (meterials) => {
        const materialList = meterials.map((material) => {
            if (material.material == 'シルバー925' && material.thick == '厚み1.2mm') {
                return new Component(state).disabledComponent(
                    material.url,
                    material.material,
                    '厚み1.2mmを選択中のため不可'
                );
            }
            else {
                return new Component(state).buttonComponent(
                    material.url,
                    material.material,
                    differencePrice(material.price)
                );
            }
        });
        //ボタンをまとめる
        return new Component().joinComponent(materialList, 'material');
    }

    //形状に関する処理
    //jsonから必要なデータ取り出し
    const types = json.filter(function (data) {
        return data.material == state.material && data.width == state.width && data.thick == state.thick && data.cave == state.cave && data.edge == state.edge;
    });
    //バリデーション＆コンポーネント呼び出し
    const typeComponent = (types) => {
        const typeList = types.map((type) => {
            return new Component(state).buttonComponent(
                type.url,
                type.type,
                differencePrice(type.price)
            );
        });
        //ボタンをまとめる
        return new Component().joinComponent(typeList, 'type');
    }

    //幅に関する処理
    //jsonから必要なデータ取り出し
    const widths = json.filter(function (data) {
        return data.material == state.material && data.type == state.type && data.thick == state.thick && data.cave == state.cave && data.edge == state.edge;
    });
    //バリデーション＆コンポーネント呼び出し
    const widthComponent = (widths) => {
        const widthList = widths.map((width) => {
            if (width.material == 'シルバー925' && width.thick == '厚み1.2mm') {

                return new Component(state).disabledComponent(
                    width.url,
                    width.width,
                    'シルバー925を選択中のため不可'
                );
            }
            else if (width.width == '幅4mm' && width.edge == 'プレーン') {
                return new Component(state).disabledComponent(
                    width.url,
                    width.width,
                    'エッジ「プレーン」を選択中のため不可'
                );
            }
            else if (width.width == '幅4mm' && width.edge == 'ダイヤモンドカット') {
                return new Component(state).disabledComponent(
                    width.url,
                    width.width,
                    'エッジ「ダイヤモンドカット」を選択中のため不可'
                );
            }
            else if (width.width == '幅4mm' && width.edge == 'コインエッジ') {
                return new Component(state).disabledComponent(
                    width.url,
                    width.width,
                    'エッジ「コインエッジ」を選択中のため不可'
                );
            }
            else {
                return new Component(state).buttonComponent(
                    width.url,
                    width.width,
                    differencePrice(width.price)
                );
            }
        });
        //ボタンをまとめる
        return new Component().joinComponent(widthList, 'width');
    }


    //厚みに関する処理
    //jsonから必要なデータ取り出し
    const thicks = json.filter(function (data) {
        return data.material == state.material && data.type == state.type && data.width == state.width && data.cave == state.cave && data.edge == state.edge;
    });
    //バリデーション＆コンポーネント呼び出し
    const thickComponent = (thicks) => {
        const thickList = thicks.map((thick) => {
            if (thick.material == 'シルバー925' && thick.thick == '厚み1.2mm') {
                return new Component(state).disabledComponent(
                    thick.url,
                    thick.thick,
                    'シルバー925を選択中のため不可'
                );
            }
            else {
                return new Component(state).buttonComponent(
                    thick.url,
                    thick.thick,
                    differencePrice(thick.price)
                );
            }
        });
        //ボタンをまとめる
        return new Component().joinComponent(thickList, 'thick');
    }

    //彫りに関する処理
    //jsonから必要なデータ取り出し
    const caves = json.filter(function (data) {
        return data.material == state.material && data.type == state.type && data.width == state.width && data.thick == state.thick && data.edge == state.edge;
    });
    //バリデーション＆コンポーネント呼び出し
    const caveComponent = (caves) => {
        const caveList = caves.map((cave) => {
            return new Component(state).buttonComponent(
                cave.url,
                cave.cave,
                differencePrice(cave.price)
            );
        });
        //ボタンをまとめる
        return new Component().joinComponent(caveList, 'cave');
    }

    //縁に関する処理
    //jsonから必要なデータ取り出し
    const edges = json.filter(function (data) {
        return data.material == state.material && data.type == state.type && data.width == state.width && data.thick == state.thick && data.cave == state.cave;
    });
    //バリデーション＆コンポーネント呼び出し
    const edgeComponent = (edges) => {
        const edgeList = edges.map((edge) => {
            if (edge.width == '幅4mm' && edge.edge == 'プレーン') {
                return new Component(state).disabledComponent(
                    edge.url,
                    edge.edge,
                    '幅4mmを選択中のため不可'
                );
            }
            else if (edge.width == '幅4mm' && edge.edge == 'ダイヤモンドカット') {
                return new Component(state).disabledComponent(
                    edge.url,
                    edge.edge,
                    '幅4mmを選択中のため不可'
                );
            }
            else if (edge.width == '幅4mm' && edge.edge == 'コインエッジ') {
                return new Component(state).disabledComponent(
                    edge.url,
                    edge.edge,
                    '幅4mmを選択中のため不可'
                );
            }
            else {
                return new Component(state).buttonComponent(
                    edge.url,
                    edge.edge,
                    differencePrice(edge.price)
                );
            }
        });
        //ボタンをまとめる
        return new Component().joinComponent(edgeList, 'edge');
    }

    //現在の商品のステータスをページ上に反映
    document.querySelector(".itemComponent").innerHTML = new Component(state).itemComponent();
    document.querySelector(".stateComponent").innerHTML = new Component(state).statusComponent();
    document.querySelector(".sp_stateComponent").innerHTML = new Component(state).statusComponent();
    document.querySelector(".materialComponent").innerHTML = materialComponent(materials);
    document.querySelector(".widthComponent").innerHTML = widthComponent(widths);
    document.querySelector(".caveComponent").innerHTML = caveComponent(caves);
    document.querySelector(".edgeComponent").innerHTML = edgeComponent(edges);
    document.querySelector(".thickComponent").innerHTML = thickComponent(thicks);
    document.querySelector(".typeComponent").innerHTML = typeComponent(types);
}