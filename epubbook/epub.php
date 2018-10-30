<?php
defined('IN_PHPCMS') or exit('No permission resources.');
//模型缓存路径
define('CACHE_MODEL_PATH', CACHE_PATH . 'caches_model' . DIRECTORY_SEPARATOR . 'caches_data' . DIRECTORY_SEPARATOR);
pc_base::load_app_func('util', 'content');


class epub
{
    private $db;

    function __construct()
    {
        $this->db = pc_base::load_model('content_model');
        

        $this->media_db = pc_base::load_model('attachment_video_model');
		
		$this->media_epub_maked_db = pc_base::load_model('media_epub_maked_model');
      	
		$this->media_epub_note_db = pc_base::load_model('media_epub_note_model');
		
		$this->siteid=get_siteid();
		$this->_userid = param::get_cookie('_userid');
    }

   

	
		//添加标签 
    public function join_maked()
    {
	
	  //print_r($_GET);exit;
		$cfi = isset($_GET['cfi']) && trim($_GET['cfi']) ? trim($_GET['cfi']) : exit(json_encode(array("status"=>-3,"msg"=>"添加失败")));
			
		$media_id = isset($_GET['media_id']) && intval($_GET['media_id']) ? intval($_GET['media_id']) : exit(json_encode(array("status"=>-3,"msg"=>"添加失败")));
		$page =   intval($_GET['page'])  ;
		$title =   trim($_GET['title'])  ;
		
		if(!$this->_userid){
			exit(json_encode(array("status"=>-4,"msg"=>"添加失败")));
		}
		$info['siteid']=$this->siteid; 
		$info['userid']=$this->_userid; 
		$info['addtime']=time(); 
		$info['media_id']=$media_id; 
		$info['cfi']=$cfi; 
		$info['page']=$page; 
		$info['title']=$title;
		
		$isresult = $this->media_epub_maked_db->get_one(array("userid"=>$this->_userid,"media_id"=>$media_id,"cfi"=>$cfi));
		
		/*print_r($isresult);
		print_r(11111);exit;*/
		if($isresult){
			print_r(json_encode(array("status"=>-2,"msg"=>"已经加入过次标签！")));
			
			exit;
		}
		$result = 0;
		
		$result = $this->media_epub_maked_db->insert($info,1);
		
        if ($result) {
            
			$succ['status'] = 1;
			$succ['msg'] = '添加成功';
			$succ['id'] = $result;
            print_r(json_encode($succ));
            exit;

        } else {

            $succ['status'] = -1;
			$succ['msg'] = '添加失败';
            print_r(json_encode($succ));
            exit;
        }


    }



    //移除标签
    public function remove_maked()
    {
		
		$biaoqian_id = isset($_GET['biaoqian_id']) && intval($_GET['biaoqian_id']) ? intval($_GET['biaoqian_id']) : exit(json_encode(array("status"=>0,"msg"=>"失败")));
		
		
 		if ($biaoqian_id) {
 			
			$result = $this->media_epub_maked_db->delete(array("id"=>$biaoqian_id));
            $succ['status'] = 1;
            //$succ['id']=1;
            print_r(json_encode($succ));
            exit;
        } else {
            $succ['status'] = 0;
            print_r(json_encode($succ));
            exit;
        }

    }
	
	
	

}

