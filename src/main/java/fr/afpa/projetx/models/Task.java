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
@Table(name= "tasks", catalog = "projetx")
public class Task implements java.io.Serializable{

		private Long idTask;
		private String name;
		private DateTime startDate;
		private DateTime endDate;
		private String description;
		private Integer progressStatus;
		private Project project;
		private Priority priority;
		private Task motherTask;
		private Set<Task> childTaskList = new HashSet<>();
		private Set<User> teamMateList = new HashSet<>();
		
		/**
		 * Constructor
		 */
		public Task() {
		}
		
		
		@Id
		@Column(name="id_task")
		@GeneratedValue(strategy=GenerationType.AUTO)
		public Long getIdTask() {
			return idTask;
		}
		public void setIdTask(Long idTask) {
			this.idTask = idTask;
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
		
		
		@Column(name="progress_status")
		public Integer getProgressStatus() {
			return progressStatus;
		}
		public void setProgressStatus(Integer progressStatus) {
			this.progressStatus = progressStatus;
		}
		
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "id_project")
		public Project getProject() {
			return project;
		}
		public void setProject(Project project) {
			this.project = project;
		}
		
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "id_priority")
		public Priority getPriority() {
			return priority;
		}		
		public void setPriority(Priority priority) {
			this.priority = priority;
		}

		@ManyToOne
		@JoinColumn(name = "mother_task")
		public Task getMotherTask() {
			return motherTask;
		}
		public void setMotherTask(Task motherTask) {
			this.motherTask = motherTask;
		}

		@ManyToMany(fetch = FetchType.LAZY)
		@JoinTable(name="tasks",
	     			joinColumns=@JoinColumn(name="mother_task"),
	     			inverseJoinColumns=@JoinColumn(name="id_task"))
		public Set<Task> getChildTaskList() {
			return childTaskList;
		}
		public void setChildTaskList(Set<Task> childTaskList) {
			this.childTaskList = childTaskList;
		}

		@ManyToMany(fetch = FetchType.LAZY)
		@JoinTable(name="tasks_users",
	     			joinColumns=@JoinColumn(name="id_task"),
	     			inverseJoinColumns=@JoinColumn(name="id_user"))
		public Set<User> getTeamMateList() {
			return teamMateList;
		}
		public void setTeamMateList(Set<User> teamMateList) {
			this.teamMateList = teamMateList;
		}		
		
		
		
}
