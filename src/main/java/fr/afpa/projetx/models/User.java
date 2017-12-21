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
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User implements java.io.Serializable {


    private static final long serialVersionUID = 1L;

    private Long idUser;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String skill;
    private Integer enabled;
    private byte[] photo;
    private Set<Project> projectList = new HashSet<>();
    private Set<Task> taskList = new HashSet<>();
    private Set<Role> roles = new HashSet<Role>();

    public User(){}
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", updatable=false)
    public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long id_user) {
		this.idUser = id_user;
	}
	
    @Column(name = "firstname")
	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
    @Column(name = "lastname")
	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

    @Pattern(regexp = "[A-Za-z0-9._-]+@[A-Za-z0-9.-]{2,}.[A-Za-z]{2,}", message = "The email format is incorrect")
    @Column(name = "email",unique = true)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
    @Override
	public String toString() {
		return "User [idUser=" + idUser + ", firstname=" + firstname + ", lastname=" + lastname + ", email=" + email
				+ ", password=" + password + ", skill=" + skill + "]";
	}

    @Size(min = 6, message = "Your password must be at least 6 characters long")
    @Column(name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
    @Column(name = "skill")
	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}
	
	
    @Column(name="enabled")
	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	
	@Column(name = "photo")
	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}
	
    @ManyToMany
    @JoinTable(name = "users_projects",
               joinColumns = @JoinColumn(name="id_user"),
               inverseJoinColumns = @JoinColumn(name="id_project"))
	public Set<Project> getProjectList() {
		return projectList;
	}

	public void setProjectList(Set<Project> projectList) {
		this.projectList = projectList;
	}
	
    @ManyToMany
    @JoinTable(name = "tasks_users",
               joinColumns = @JoinColumn(name="id_user"),
               inverseJoinColumns = @JoinColumn(name="id_project"))
	public Set<Task> getTaskList() {
		return taskList;
	}

	public void setTaskList(Set<Task> taskList) {
		this.taskList = taskList;
	}
	
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "id_user", referencedColumnName = "id_user"),
            inverseJoinColumns = @JoinColumn(
                    name = "id_role", referencedColumnName = "id_role"))
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

    
}