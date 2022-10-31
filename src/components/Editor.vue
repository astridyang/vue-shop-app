<template>
	<editor v-model="content" tag-name="div" :init="init"/>
</template>
<script>
export default {
	name: "EditorVue"
}
</script>
<script setup>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/image'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
// import 'tinymce/plugins/hr'
// import 'tinymce/plugins/toc'
// import 'tinymce/plugins/noneditable'
// import 'tinymce/plugins/paste'
// import 'tinymce/plugins/print'
// import 'tinymce/plugins/spellchecker'
// import 'tinymce/plugins/tabfocus'
// import 'tinymce/plugins/textpattern'
const props = defineProps({
	modelValue: String
})
const emits = defineEmits(["update:modelValue"])
import {ref, watch} from "vue";

const init = {
	skin_url: "/tinymce/skins/ui/oxide",
	content_css: "/tinymce/skins/content/default/content.min.css",
	menubar: false,
	autosize_bottom_margin: 50,
	max_height: 500,
	min_height: 450,
	toolbar_mode: "none",
	// noneditable toc print textpattern hr
	plugins: 'advlist anchor autolink code codesample  directionality fullscreen insertdatetime link lists nonbreaking  pagebreak paste preview save searchreplace tabfocus  template  visualblocks visualchars wordcount table image ',
	toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | toc alignleft aligncenter alignright alignjustify lineheight | outdent indent | numlist bullist | forecolor backcolor | pagebreak | charmap emoticons | fullscreen preview save print | hr link image | anchor pagebreak | insertdatetime | blockquote removeformat subscript superscript code codesample | searchreplace',
	content_style: "p {margin: 5px 0;font-size:14px}",
	font_size_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
	font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif,Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
	branding: false,
	elementpath: false,
	resize: false,
	statusbar: false
}
tinymce.init;
const content = ref(props.modelValue)
watch(props, (newVal) => content.value = newVal.modelValue)
watch(content, (newVal) => emits("update:modelValue", newVal))

</script>
<style>
.tox-tinymce-aux {
	z-index: 9999 !important;
}
</style>

























