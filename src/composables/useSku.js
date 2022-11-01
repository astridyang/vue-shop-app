import {ref} from 'vue'
import {createGoodsSkuCard, deleteSkuCard, updateskusCard} from "~/api/goods";

export const goodsId = ref(0)

export const skuCardList = ref([])

export function initSkuCardList(data) {
    skuCardList.value = data.goodsSkusCard.map(item => {
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(o => {
            o.text = o.value
            return o;
        })
        return item;
    })
}

export const btnLoading = ref(false)

export function addSkuCard() {
    btnLoading.value = true
    createGoodsSkuCard({
        "goods_id": goodsId.value, //商品ID
        "name": "option", //规格名称
        "order": 50, //排序
        "type": 0 //规格类型 0文字
    }).then(res => {
        skuCardList.value.push({
            ...res,
            text: res.name,
            loading: false,
            goodsSkusCardValue: []
        })
    }).finally(() => {
        btnLoading.value = false
    })
}

export function updateSkuCard(item) {
    item.loading = true
    updateskusCard(item.id, {
        "goods_id": item.goods_id, //商品ID
        "name": item.text, //规格名称
        "order": 50, //排序
        "type": 0 //规格类型 0文字
    }).then(res => {
        item.name = item.text
    }).catch(err => {
        item.text = item.name
    }).finally(() => {
        item.loading = false
    })
}

export function handleDeleteSkuCard(item) {
    item.loading = true
    deleteSkuCard(item.id).then(() => {
        const idx = skuCardList.value.findIndex(o => o.id === item.id);
        if (idx !== -1) {
            skuCardList.value.splice(idx, 1);
        }
    }).finally(()=>{
        item.loading = false
    })
}

export function initSkuCardItem(id) {
    const item = skuCardList.value.find(o => o.id == id);
    return {item}
}