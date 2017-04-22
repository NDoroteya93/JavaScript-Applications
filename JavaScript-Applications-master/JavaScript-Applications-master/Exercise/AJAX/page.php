<?php
if(isset($_GET['page'])){ 
    $page = trim($_GET['page']);
    $allowed = array('home', 'downloads', 'tutorials');

    if(in_array($page, $allowed)){ 
        echo file_get_contents("./pages/{$page}.html")
    }
}
?>