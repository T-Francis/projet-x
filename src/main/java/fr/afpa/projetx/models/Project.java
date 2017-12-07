package fr.afpa.projetx.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.joda.time.DateTime;

@Entity
@Table(name= "projects", catalog = "projetx")
public class Project implements java.io.Serializable {

	private Long idProject;
	private String name;
	private DateTime startDate;
	private DateTime endDate;
	private String description;
	private User projectChief;
	private Set<User> teamMateList = new HashSet<>();
	
	
	/**
	 * Constructor
	 */
	public Project() {
	}
	
	@Id
	@Column(name="id_project")
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getIdProject() {
		return idProject;
	}
	public void setIdProject(Long idProject) {
		this.idProject = idProject;
	}
	
	@Column(name="name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name="start_date")
	public DateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(DateTime startDate) {
		this.startDate = startDate;
	}
	
	@Column(name="end_date")
	public DateTime getEndDate() {
		return endDate;
	}
	public void setEndDate(DateTime endDate) {
		this.endDate = endDate;
	}
	
	@Column(name="description")
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_user")
	public User getProjectChief() {
		return projectChief;
	}
	public void setProjectChief(User projectChief) {
		this.projectChief = projectChief;
	}
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name="users_projects",
     			joinColumns=@JoinColumn(name="id_project"),
     			inverseJoinColumns=@JoinColumn(name="id_user"))
	public Set<User> getTeamMateList() {
		return teamMateList;
	}
	public void setTeamMateList(Set<User> teamMateList) {
		this.teamMateList = teamMateList;
	}
	
}
