package cmu.ebiz.team12;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

public class Util {
	public static String bytesToHex(byte[] bytes) {
		if (bytes == null) {
			return "";
		}
		StringBuffer digestSB = new StringBuffer();
		for (int i = 0; i < bytes.length; i++) {
			int lowNibble = bytes[i] & 0x0f;
			int highNibble = (bytes[i] >> 4) & 0x0f;
			digestSB.append(Integer.toHexString(highNibble));
			digestSB.append(Integer.toHexString(lowNibble));
		}
		return digestSB.toString();
	}

	public static byte[] hexToBytes(String hexString) {
		byte[] b = new byte[hexString.length() / 2];
		for (int i = 0; i < b.length; i++) {
			int index = i * 2;
			int v = Integer.parseInt(hexString.substring(index, index + 2), 16);
			b[i] = (byte) v;
		}
		return b;
	}

	private static final boolean _DEBUG_ = true;
	private static final int HOST_CLASS_INDEX = 4;

	public static void log(Object... msgs) {
		if (_DEBUG_) {
			String logMsg = Util.getString(msgs);
			System.out
					.println(Util.getString(
							Util.getClassNameByStackIndex(HOST_CLASS_INDEX),
							Util.getHostFunctionName(HOST_CLASS_INDEX), "(): ",
							logMsg));
		}
	}

	public static String getClassNameByStackIndex(int index) {
		try {
			String name = Thread.currentThread().getStackTrace()[index]
					.getClassName();
			int dot = name.lastIndexOf('.');
			return name.substring(dot + 1);
		} catch (Exception e) {
		}
		return "";
	}

	public static String getHostFunctionName(int index) {
		try {
			return Thread.currentThread().getStackTrace()[index]
					.getMethodName();
		} catch (Exception e) {
		}
		return "unknown method";
	}

	public static String getString(Object... objects) {
		if (objects == null) {
			return "";
		}
		StringBuilder sb = new StringBuilder();
		for (Object o : objects) {
			if (o != null) {
				sb.append(o.toString());
			}
		}
		return sb.toString();
	}

	public static byte[] getUtf8Bytes(String s) {
		if (s == null) {
			return null;
		}
		try {
			return s.getBytes("utf-8");
		} catch (UnsupportedEncodingException e) {
		}
		return s.getBytes();
	}

	public static String getUtf8String(byte[] bytes) {
		if (bytes == null) {
			return null;
		}
		try {
			return new String(bytes, "utf-8");
		} catch (UnsupportedEncodingException e) {
		}
		return null;
	}

	public static String getSHA1(String content, Integer salt) {
		byte[] md5 = digest("SHA1", content.getBytes(), salt);
		return bytesToHex(md5);
	}

	public static String getSHA1(byte[] content, Integer salt) {
		byte[] md5 = digest("SHA1", content, salt);
		return bytesToHex(md5);
	}

	public static byte[] digest(String algorithm, byte[] content, Integer salt) {
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance(algorithm);
		} catch (NoSuchAlgorithmException e) {
			throw new AssertionError(
					"Can't find the SHA1 algorithm in the java.security package");
		}

		if (salt != null) {
			String saltString = String.valueOf(salt);
			md.update(saltString.getBytes());
		}
		md.update(content);
		return md.digest();
	}

	public static byte[] getBytes(InputStream inputStream) {
		if (inputStream == null) {
			return null;
		}
		byte[] result = null;
		try {
			ByteArrayOutputStream outStream = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = inputStream.read(buffer)) != -1) {
				outStream.write(buffer, 0, len);
			}
			result = outStream.toByteArray();
		} catch (Exception e) {
		}
		return result;
	}

	public static void setBytes(OutputStream outputStream, byte[] bytes) {
		if (outputStream == null || bytes == null) {
			return;
		}
		try {
			outputStream.write(bytes);
			outputStream.flush();
		} catch (IOException e) {
		} finally {
			try {
				outputStream.close();
			} catch (IOException e) {
			}
		}
		return;
	}

	public static boolean isEmpty(String s) {
		return s == null || s.length() == 0;
	}

	public static String getPath(Object... file) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < file.length; i++) {
			if (file[i] == null) {
				continue;
			}
			String fileName = file[i].toString();
			sb.append(fileName);
			if (!fileName.endsWith(File.pathSeparator)) {
				sb.append(File.pathSeparator);
			}
		}
		return sb.toString();
	}

	public static String urlEncode(String string) {
		try {
			return URLEncoder.encode(string, "utf-8");
		} catch (UnsupportedEncodingException e) {
			log(e);
			return string;
		}
	}

	public static String queryString(Map<String, String[]> params) {
		StringBuilder sb = new StringBuilder();
		for (Map.Entry<String, String[]> entry : params.entrySet()) {
			for (String value : entry.getValue()) {
				if (sb.length() == 0) {
					sb.append('?');
				} else {
					sb.append('&');
				}
				sb.append(urlEncode(entry.getKey()));
				sb.append('=');
				sb.append(urlEncode(value));
			}
		}
		return sb.toString();
	}

	public static void main(String[] args) {
	}
}
