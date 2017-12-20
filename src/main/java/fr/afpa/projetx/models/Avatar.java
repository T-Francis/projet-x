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
@Table(name= "avatars", catalog = "projetx")
public class Avatar implements java.io.Serializable  {

	private static final long serialVersionUID = 1L;
	
	private Long idAvatar;
	private String url;
	private Set<User> userList = new HashSet<>();
	/**
	 * Constructor
	 */
	public Avatar() {}
	
	@Id
	@Column(name="id_avatar")
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getIdAvatar() {
		return idAvatar;
	}
	public void setIdAvatar(Long idAvatar) {
		this.idAvatar = idAvatar;
	}

	@Column(name="url")
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "avatar")
	public Set<User> getUserList() {
		return userList;
	}

	public void setUserList(Set<User> userList) {
		this.userList = userList;
	}	
}
