package fr.afpa.projetx.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name= "priorities", catalog = "projetx")
public class Priority implements java.io.Serializable {
	
	private Long idPriority;
	private String name;
	
	/**
	 * Constructor
	 */
	public Priority() {
	}
	
	@Id
	@Column(name="id_priority")
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getIdPriority() {
		return idPriority;
	}
	public void setIdPriority(Long idPriority) {
		this.idPriority = idPriority;
	}
	
	@Column(name="name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "priority")
	public Set<Task> getTaskList() {
		return taskList;
	}
	public void setTaskList(Set<Task> taskList) {
		this.taskList = taskList;
	}
	private Set<Task> taskList = new HashSet<>();
	
}
