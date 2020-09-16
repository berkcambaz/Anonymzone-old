<?php

class Database
{
    private $host = "sql313.epizy.com";
    private $username = "epiz_26726797";
    private $password = "u84iIora1rl";
    private $database = "epiz_26726797_anonymzone";
    private $pdo;

    public function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host=$this->host;dbname=$this->database", $this->username, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Connected successfully
        } catch (PDOException $e) {
            echo $e->getMessage();
            // Connection failed
        }
    }

    public function __destruct()
    {
        $this->pdo = null;
    }

    public function query($sql, $params = array())
    {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getPDO()
    {
        return $this->pdo;
    }
}
