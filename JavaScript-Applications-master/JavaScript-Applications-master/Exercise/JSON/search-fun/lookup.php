<?php
header('Content-Type: application/json'); 

$people = array(
    'Alex' => array(
        'age' => 24, 
        'location'=> 'Greenwich', 
        'job' => 'Web developer'
    ), 
    'Joshua' => array( 
        'age' => 21, 
        'location'=> 'Chorley', 
        'job' => 'Teacher'
    )
)

$return = array('exist' => true);

echo json_encode($return);
?>