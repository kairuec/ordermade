
//PCのみの機能　タブ（表示内容の切替）
const tabs = [
    '.materialComponent',
    '.widthComponent',
    '.thickComponent',
    '.caveComponent',
    '.edgeComponent',
    '.typeComponent'
];

//切り替える処理
const tab = (props) => {

    tabs.map((tab) => {

        if (tab == props) {
            let changeTab = document.querySelector(props);
            changeTab.style.display = "block";
            let changeButton = document.querySelector(props + 'Btn');
            changeButton.style.cssText = "background-color: #3E2929; color: #ffffff;";
        }
        else {
            let changeTab = document.querySelector(tab);
            changeTab.style.display = "none";
            let changeButton = document.querySelector(tab + 'Btn');
            changeButton.style.cssText = "background-color: #e5e5e5; color: #333333;";
        }
    });
}

// 起動時の処理
if (window.matchMedia('(min-width:768px)').matches) {
    //PC処理
    window.addEventListener("load", tab(".materialComponent"));
}