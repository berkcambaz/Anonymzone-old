<?php

class Database
{
    private $host = "sql313.epizy.com";
    private $user = "epiz_26726797";
    private $password = "u84iIora1rl";
    private $database = "epiz_26726797_anonymzone";
    private $connection;

    public function __construct()
    {
        $this->connection = mysqli_connect($this->host, $this->user, $this->password, $this->database);
        if (!$this->connection) {
            echo "Couldn't establish connection to server.<br>Error : " . mysqli_connect_error();
        }
    }

    public function __destruct()
    {
        mysqli_close($this->connection);
    }

    public function query($sql)
    {
        return mysqli_query($this->connection, $sql);
    }

    public function getConnection()
    {
        return $this->connection;
    }
}
