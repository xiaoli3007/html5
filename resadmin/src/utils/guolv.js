/**
 * Created by sun
 */

export function isallsubinarray(arr,all_arr) {
  // const valid_map = ['admin', 'editor']
  // console.log(arr)
  // console.log(all_arr)
   let return_arr = JSON.parse(JSON.stringify(arr)) 
  all_arr.forEach( function(item,index){
        // console.log(item.id)
		
		if(arr.indexOf(item.id)!=-1){	//存在父  查父的子是不是全部存在
		
		    let childleng = item.children.length  //子的多少
			if(childleng>0){
				let duibi = 0 
				item.children.forEach( function(item2,index2){
					if(arr.indexOf(item2.id)!=-1){
						duibi += 1 
					}
				})
				if(childleng != duibi){
					return_arr.splice(return_arr.indexOf(item.id),1)
				}
			}
			
		}
    })
		  
  return return_arr
}

  
 

