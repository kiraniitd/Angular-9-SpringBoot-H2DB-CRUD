package gov.max.rb.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gov.max.rb.exceptionhandling.ResourceNotFoundException;
import gov.max.rb.model.Rule;
import gov.max.rb.service.RuleService;
import gov.max.rb.service.RuleServiceException;

@RestController
@RequestMapping("/api/rules")
public class RuleController {
	
	@Autowired
	private RuleService ruleService;
	
	@GetMapping("/")
	private List<Rule> getAllRules()  throws ResourceNotFoundException, RuleServiceException{	
		try
		{
			List<Rule> rule = ruleService.getAllRules();
			if (rule == null) {
				throw new ResourceNotFoundException("Rules not found");
			}
			return rule;
		}catch (RuleServiceException e) {
			throw new RuleServiceException("Internal Server Exception while getting data");
		}
	}
	
	@GetMapping("/{id}")
	private Rule getRuleById(@PathVariable("id") long id)  throws ResourceNotFoundException, RuleServiceException {		
		try
		{
			Rule rule = ruleService.getRuleById(id);
			if (rule == null) {
				throw new ResourceNotFoundException("Rules not found");
			}
			return rule;
		}catch (RuleServiceException e) {
			throw new RuleServiceException("Internal Server Exception while getting data by Rule Id");
		}
	}
	
	@DeleteMapping("/{id}")
	private void deleteRule(@PathVariable("id") long id)  throws ResourceNotFoundException, RuleServiceException {			
		try
		{
				ruleService.delete(id);

		}catch (RuleServiceException e) {
			throw new RuleServiceException("Internal Server Exception while deleting data by Rule Id");
		}
	}
	
	@PostMapping("/")
	private long saveRule(@RequestBody Rule rule)  throws ResourceNotFoundException, RuleServiceException {
		try
		{
			ruleService.saveOrUpdate(rule);
			return rule.getRuleNumber();
		}catch (RuleServiceException e) {
			throw new RuleServiceException("Internal Server Exception while getting posting data");
		}
	}

	@PostMapping("/addMath")
	private void addMath(@RequestBody Rule rule)  throws ResourceNotFoundException, RuleServiceException {		
		try
		{
			if(rule.getRuleDefinition() !=null)
			{
				String droolStr = convertToDrools(rule.getRuleDefinition());
				rule.setDroolsRule(droolStr);
				Timestamp timestamp = new Timestamp(System.currentTimeMillis());
				rule.setDate(timestamp);
			}
		ruleService.saveOrUpdate(rule);
		}catch (RuleServiceException e) {
			throw new RuleServiceException("Internal Server Exception while getting posting data");
		}
	}
	
	private String convertToDrools(String ruleDefinition)
	{
		return ruleDefinition + " -  Drools converted";
	}
}
