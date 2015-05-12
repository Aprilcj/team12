package cmu.ebiz.team12.bean;

import java.util.List;

public class RoutesResponse {
	public Response bustime_response;
	
	public static class Response{
		public List<Route> route; 
	}
	public static class Route{
		public String rt;
		public String rtnm;
		public String rtclr;
	}
}
