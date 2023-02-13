/**
    do not modify this file. modify ./pockets-plugin.ts instead
*/
import { reactive  } from "vue"

import {  $pockets } from "@/pockets"
/**
    Injected data from apply_filters('vuejs-app/data) is injected in here.
*/
$pockets.data = reactive((window as any).pocketsData);
/**
    This is looking for a meta tag in the head, and using its content to set
    webpacks public path. This allows chunk calls to work correctly.
*/
let tag:any = document.querySelector('meta[name="pockets-vue"]') ?? { content: ""}
__webpack_public_path__ = tag.content

$pockets.init()

