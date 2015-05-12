package cmu.ebiz.team12.bean;

import java.util.List;

public class DirectionsResponse {
	public Response bustime_response;
	public static class Response{
		public List<String> dir;
	}
}
