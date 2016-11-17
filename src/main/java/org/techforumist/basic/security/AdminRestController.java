package org.techforumist.basic.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {

	@RequestMapping("/resource")
	public Map<String, Object> sayHello() {
		Map<String, Object> map = new HashMap<>();
		map.put("message", "Hello Administrator");
		map.put("timestamp", new Date().getTime());
		return map;
	}

}
