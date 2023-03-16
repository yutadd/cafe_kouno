package com.yutadd.service.job;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.yutadd.model.external_api.Posts;

@Service
public class Instagram {
	private long lastRequestTimeStamp=0;
	private Posts lastResult=null;
	private String API_PATH="https://graph.facebook.com/v14.0/";
	private String IG_USER_ID=System.getenv("IG_USER_ID");
	private String FIELDS="caption,children,comments_count,id,like_count,media_type,media_url,thumbnail_url";
	private String FB_ACCESS_TOKEN=System.getenv("FB_ACCESS_TOKEN");
	public Posts getPosts() {
		if(System.currentTimeMillis()-lastRequestTimeStamp>60) {
			try {
				URL url=new URL(API_PATH+IG_USER_ID+"/media?fields="+FIELDS+"&access_token="+FB_ACCESS_TOKEN);
				HttpURLConnection http = (HttpURLConnection)url.openConnection();
				http.setRequestMethod("GET");
				http.connect();
				BufferedReader reader = new BufferedReader(new InputStreamReader(http.getInputStream()));
				String json = "", line = "";
				while((line = reader.readLine()) != null)
					json += line;
				reader.close();
				return new Gson().fromJson(json,Posts.class);
			}catch(Exception e) {
				e.printStackTrace();
			}

		}
		return null;
	}
}
