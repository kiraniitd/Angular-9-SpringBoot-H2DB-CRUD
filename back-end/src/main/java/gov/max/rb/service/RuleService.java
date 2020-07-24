package gov.max.rb.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gov.max.rb.dao.RuleDAO;
import gov.max.rb.model.Rule;

@Service
public class RuleService {
	
	@Autowired
	private RuleDAO ruleDAO;
	
	public List<Rule> getAllRules() throws RuleServiceException {
		List<Rule> rules = new ArrayList<>();
		ruleDAO.findAll().forEach(rule -> rules.add(rule));
		return rules;
	}
	
	public Rule getRuleById(long id)  throws RuleServiceException {
		return ruleDAO.findById(id).get();
	}
	
	public void saveOrUpdate(Rule rule)  throws RuleServiceException {
		ruleDAO.save(rule);
	}
	
	public void delete(long id)  throws RuleServiceException {
		ruleDAO.deleteById(id);
	}

/*	public void delete(Rule rule) {
		ruleDAO.delete(rule);
	}*/
	

}
