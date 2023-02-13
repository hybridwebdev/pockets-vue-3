<?php 
namespace pockets\crud;
/** 
    Utility class that provides a logging tool. 
*/
class model_test {
    function log($title, $data = null){
        echo "<pre>";
            echo "<h1>{$title}</h1>";
            var_dump($data);
        echo "</pre>";
    }
}