package cmu.ebiz.team12;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;

public class BusTimeAPI extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	Map<String, String> API_URLS;

	@Override
	public void init() throws ServletException {
		super.init();
		API_URLS = new HashMap<String, String>();
		API_URLS.put("directions",
				"http://truetime.portauthority.org/bustime/api/v1/getdirections");
		API_URLS.put("stops",
				"http://truetime.portauthority.org/bustime/api/v1/getstops");
		API_URLS.put("routes",
				"http://truetime.portauthority.org/bustime/api/v1/getroutes");
		API_URLS.put("vehicles",
				"http://truetime.portauthority.org/bustime/api/v1/getvehicles");
		API_URLS.put("predictions",
				"http://truetime.portauthority.org/bustime/api/v1/getpredictions");
		API_URLS.put("patterns",
				"http://truetime.portauthority.org/bustime/api/v1/getpatterns");
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		//as for http://host/bus/stops?rt=61D&dir=INBOUND
		// action = /stops
		String action = req.getPathInfo();
		if (action != null && action.startsWith("/")) {
			action = action.substring(1);
		}
		Util.log("action = ", action);

		String url = API_URLS.get(action);
		if (Util.isEmpty(url)) {
			Util.log("no url matched");
			resp.getWriter().println("");
			return;
		}
		Util.log("url = ", url);

		Map<String, String[]> params = new HashMap<String, String[]>(
				req.getParameterMap());
		params.put("key", new String[] { "7RD4Ht3DJLWYDDyEUQNRXD7cX" });
		String queryString = Util.queryString(params);
		Util.log("queryString = ", queryString);

		String xml = Http.get(url + queryString);
		JSONObject jsonObject = null;
		String jsonString = null;
		try {
			jsonObject = XML.toJSONObject(xml);
			jsonString = jsonObject.toString(4);
			resp.getWriter().println(jsonString);
		} catch (JSONException je) {
			Util.log(je);
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}
