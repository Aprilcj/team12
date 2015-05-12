package cmu.ebiz.team12;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

public class Http {
	static OkHttpClient client = new OkHttpClient();

	public static String get(String url) {
		Request request = new Request.Builder().url(url).build();
		try {
			Response response = client.newCall(request).execute();
			return response.body().string();
		} catch (Exception e) {
			Util.log(e);
		}
		return null;
	}
}
