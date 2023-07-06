import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubCompany {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  accreditation: boolean;

  //   @Column(name = "agreementId")
  //   private Long agreementId;

  //   @NotNull
  //   @Column(name = "accreditation", columnDefinition = "boolean default false")
  //   private Boolean accreditation;

  //   @OneToOne(cascade = CascadeType.ALL)
  //   @JoinColumn(name = "company_profile_id", referencedColumnName = "id")
  //   private CompanyProfile companyProfile;

  //   public SubCompany() {
  //   }

  //   public SubCompany(String email, String password, UserStatus userStatus, Boolean limitAccess, Boolean invited, @NotNull Boolean accreditation) {
  //       super(email, password, userStatus, limitAccess, invited);
  //       this.accreditation = accreditation;
  //   }

  //   public SubCompany(UserStatus userStatus, Boolean limitAccess, Boolean invited, @NotNull Boolean accreditation) {
  //       super(userStatus, limitAccess, invited);
  //       this.accreditation = accreditation;
  //   }

  //   public Boolean getAccreditation() {
  //       return accreditation;
  //   }

  //   public void setAccreditation(Boolean accreditation) {
  //       this.accreditation = accreditation;
  //   }

  //   public Long getAgreementId() {
  //       return agreementId;
  //   }

  //   public void setAgreementId(Long agreementId) {
  //       this.agreementId = agreementId;
  //   }

  //   @ManyToOne(fetch = FetchType.LAZY)
  //   private Gk gk;

  //   @JsonIgnore
  //   public Gk getGk() {
  //       return gk;
  //   }

  //   public void setGk(Gk gk) {
  //       this.gk = gk;
  //   }

  //   public CompanyProfile getCompanyProfile() {
  //       return companyProfile;
  //   }

  //   public void setCompanyProfile(CompanyProfile companyProfile) {
  //       this.companyProfile = companyProfile;
  //   }
}
