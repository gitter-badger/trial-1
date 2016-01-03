<?php
/*　処理の流れ
1 外部phpでRecords0のインスタンス作成
2 initPropsを実行してsql文に必要なパラメータを初期化
3 set***に条件式と更新式のカラム名、カラム値を渡して初期化
4 createSqlでsql文（bindValue文を除く）を作成
5 updateでbindValueをし、sql文を実行
*/

/* Copyright (c) 2015-present, Takaki Ishibashi. All rights reserved. */
ini_set("display_errors", 1);
error_reporting(E_ALL);

require_once(dirname(__FILE__).'/../../Db.php');

class Records{
  use Db;

  //db props
  private $host = '';
  private $db = '';
  private $db_usr = '';
  private $db_pass = '';
  //tbl props
  private $tbl = '';
  private $cols = array();
  //sql props
  private $sql = '';
  private $cond_cols = array();
  private $cond_vals = array();
  private $update_cols = array();
  private $update_vals = array();

  public function initProps() {
    //set db params
    $this->host = $this->getDbParam('db_host_name');
    $this->db = $this->getDbParam('db_name');
    $this->db_usr = $this->getDbParam('db_usr_name');
    $this->db_pass = $this->getDbParam('db_usr_pass');

    //set tbl params
    $this->tbl = $this->getDbParam('record_tbl_name');
    $this->cols[0] = $this->getDbParam('record_tbl_col0');
    $this->cols[1] = $this->getDbParam('record_tbl_col1');
    $this->cols[2] = $this->getDbParam('record_tbl_col2');
    $this->cols[3] = $this->getDbParam('record_tbl_col3');
    $this->cols[4] = $this->getDbParam('record_tbl_col4');
    $this->cols[5] = $this->getDbParam('record_tbl_col5');
    $this->cols[6] = $this->getDbParam('record_tbl_col6');
    $this->cols[7] = $this->getDbParam('record_tbl_col7');
    $this->cols[8] = $this->getDbParam('record_tbl_col8');
    $this->cols[9] = $this->getDbParam('record_tbl_col9');
  }

  //NOTE 条件式のカラム名とカラム値をキャッシュ
  public function setConditionProps($input_cond_col_indexes, $input_cond_vals) {
    foreach ($input_cond_col_indexes as $key => $value) {
      $this->cond_cols[$key] = $this->cols[$value];
    }

    foreach ($input_cond_vals as $key => $value) {
      $this->cond_vals[$key] = $value;
    }
  }

  //NOTE 更新するカラム名とカラム値をキャッシュ
  public function setUpdateProps($input_update_col_indexes, $input_update_vals) {
    foreach ($input_update_col_indexes as $key => $value) {
      $this->update_cols[$key] = $this->cols[$value];
    }

    foreach ($input_update_vals as $key => $value) {
      $this->update_vals[$key] = $value;
    }
  }

  //NOTE 条件式+更新するカラム名=update文を作成、更新するカラム値の部分はバインドIDを埋め込んでおき後でbindValueで置換
  public function createSql() {
    $str = "UPDATE $this->db.$this->tbl SET ";
    $update_strs = array();
    $cond_strs = array();

    foreach ($this->update_cols as $key => $value) {
      $update_strs[$key] = "$value=:update_val$key";
    }
    foreach ($this->cond_cols as $key => $value) {
      $cond_strs[$key] = "$value=:cond_val$key";
    }

    $str = $str.implode(', ', $update_strs)." WHERE ".implode(' AND ', $cond_strs);
    $this->sql = $str;
  }

  //NOTE 更新するカラム値の置換+update文の実行
  public function update() {
    $dsn = "mysql:host=$this->host;dbname=$this->db;charset=utf8";
    try {
      $pdo = new PDO($dsn, $this->db_usr, $this->db_pass);
      $stmt = $pdo->prepare($this->sql);

      foreach ($this->update_vals as $key => $value) {
        $bind_update_val = $this->update_vals[$key];
        $stmt->bindValue(":update_val$key", $bind_update_val);
      }

      foreach ($this->cond_vals as $key => $value) {
        $bind_cond_val = $this->cond_vals[$key];
        $stmt->bindValue(":cond_val$key", $bind_cond_val);
      }

      $stmt->execute();//XXX

    } catch (PDOException $e) {
      echo "DB connection fail. reason: ".$e->getMessage();
      die();
    } catch (Exception $e) {
      echo "Oops error, reason: ".$e->getMessage();
      die();
    }

    $pdo = null;
  }
}
?>
