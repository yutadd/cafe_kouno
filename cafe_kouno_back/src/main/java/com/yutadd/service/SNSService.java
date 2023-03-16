package com.yutadd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yutadd.model.external_api.PostData;
import com.yutadd.model.external_api.Posts;
import com.yutadd.service.job.Instagram;
@Service
public class SNSService {
	@Autowired
	Instagram instagram;
	public List<String> getPosts(int type){
		Posts posts=instagram.getPosts();
		ArrayList<String> result=new ArrayList<String>();
		if(type==0) {
			for(PostData pd:posts.data) {
				result.add(pd.media_url);
			}
		}else {
			for(PostData pd:posts.data) {
			result.add(pd.permalink);
		}
		}

		return result;
	}
}
