<?php 
namespace pockets\crud\images;
class model extends \pockets\crud\posts\model {
    public static $model_name = 'images';
    public $read_model_class = '\pockets\crud\images\read_model';
}