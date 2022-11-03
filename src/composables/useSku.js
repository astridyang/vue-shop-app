import {nextTick, ref} from 'vue'
import {
    createGoodsSkuCard,
    deleteSkuCard,
    updateskusCard,
    sortGoodsSkuCard,
    createGoodsSkuCardValue,
    updateskusCardValue, deleteSkuCardValue, setGoodsSkusCard
} from "~/api/goods";
import {useArrayMoveDown, useArrayMoveUp} from "~/composables/util";

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
    }).finally(() => {
        item.loading = false
    })
}

export const bodyLoading = ref(false)

export function sortCard(action, index) {
    const oList = JSON.parse(JSON.stringify(skuCardList.value))
    let fun = action === 'up' ? useArrayMoveUp : useArrayMoveDown;
    fun(oList, index)
    const sortdata = oList.map((o, i) => {
        return {
            id: o.id,
            order: i + 1
        }
    })

    bodyLoading.value = true
    sortGoodsSkuCard({sortdata}).then(res => {
        fun(skuCardList.value, index)
    }).finally(() => {
        bodyLoading.value = false
    })
}

export function handleSetGoodsSkuCard(id, data) {
    let item = skuCardList.value.find(o => o.id === id)
    item.loading = true
    setGoodsSkusCard(id, data).then(res => {
        item.name = item.text = res.goods_skus_card.name
        item.goodsSkusCardValue = res.goods_skus_card_value.map(o => {
            o.text = o.value || "option value"
            return o
        })
    }).finally(() => {
        item.loading = false
    })
}

export function initSkuCardItem(id) {
    const item = skuCardList.value.find(o => o.id == id);
    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref()
    const loading = ref(false)

    const handleClose = (tag) => {
        loading.value = true
        deleteSkuCardValue(tag.id).then(res => {
            let idx = item.goodsSkusCardValue.findIndex(o => o.id === tag.id)
            if (idx !== -1) {
                item.goodsSkusCardValue.splice(idx, 1)
            }
        }).finally(() => {
            loading.value = false
        })
    }

    const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
            InputRef.value.input.focus()
        })
    }

    const handleInputConfirm = () => {

        if (!inputValue.value) {
            inputVisible.value = false
            return
        }
        loading.value = true
        createGoodsSkuCardValue({
            "goods_skus_card_id": id, //规格ID
            "name": item.name, //规格名称
            "order": 50, //排序
            "value": inputValue.value //规格选项名称
        }).then((res) => {
            item.goodsSkusCardValue.push({
                ...res,
                text: res.value
            })
        }).finally(() => {
            loading.value = false
            inputVisible.value = false
            inputValue.value = ''
        })

    }
    const handleChange = (value, tag) => {
        loading.value = true
        updateskusCardValue(tag.id, {
            "goods_skus_card_id": id, //规格ID
            "name": item.name, //规格名称
            "order": tag.order, //排序
            "value": value //规格选项名称
        }).then(res => {
            tag.value = value
        }).catch(() => {
            tag.text = tag.value
        }).finally(() => {
            loading.value = false
        })
    }

    return {item, inputValue, inputVisible, InputRef, handleClose, showInput, handleInputConfirm, loading, handleChange}
}