package gov.max.rb.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import gov.max.rb.model.Rule;

@Repository
public interface RuleDAO extends CrudRepository<Rule, Long> {

}
