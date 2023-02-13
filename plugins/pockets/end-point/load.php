<?php 
namespace pockets\end_point;

class load {
     function __construct(){
          \pockets::loader([
               'end_point\crud',
          ]); 
     }
}
