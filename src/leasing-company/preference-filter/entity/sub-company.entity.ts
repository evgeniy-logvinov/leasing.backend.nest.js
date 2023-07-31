import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Gk } from './gk.entity';

@Entity()
export class SubCompany extends LeasingEntity {
  @Column()
  accreditation: boolean;

  @ManyToOne(() => Gk, (item) => item.subCompanies)
  gk: Gk;

  @Column()
  name: string;

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
