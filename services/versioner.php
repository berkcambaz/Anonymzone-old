<?php

// Usage template
/* <?php echo $v->version("") ?> */

class Versioner
{
    public function version($file)
    {
        return $file . "?v=" . filemtime($file);
    }
}
