<?php

class Database
{
    private $host = "localhost";
    private $user = "root";
    private $password = "";
    private $database = "anonymzone";
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
