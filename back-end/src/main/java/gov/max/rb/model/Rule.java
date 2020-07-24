package gov.max.rb.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="TRUL200_EDIT_RULES")
public class Rule {
	
	@Id()
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="RULE_NUMBER")
	private long ruleNumber;
	
	@Column(name="RULE_DEFINITION", nullable=true)
	private String ruleDefinition;
	
	@Column(name="DROOLS_RULE", nullable=true)
	private String droolsRule;	

	@Column(name="DATE", nullable=true)
	private Timestamp date;

	
	public long getRuleNumber() {
		return ruleNumber;
	}

	public void setRuleNumber(long ruleNumber) {
		this.ruleNumber = ruleNumber;
	}	
	
	public String getRuleDefinition() {
		return ruleDefinition;
	}

	public void setRuleDefinition(String ruleDefinition) {
		this.ruleDefinition = ruleDefinition;
	}
	
	public String getDroolsRule() {
		return droolsRule;
	}

	public void setDroolsRule(String droolsRule) {
		this.droolsRule = droolsRule;
	}	

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}
	
	@Override
	public String toString() {
		return "Rule [ruleNumber=" + ruleNumber + ", ruleDefinition=" + ruleDefinition + ", droolsRule=" + droolsRule + "]";
	}
}
