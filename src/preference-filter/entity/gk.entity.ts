import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { SubCompany } from './sub-company.entity';

@Entity()
export class Gk {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  gk: boolean;

  @ManyToOne(() => SubCompany)
  @JoinColumn()
  subCompanies: SubCompany;

  //   @Id
  //     @GeneratedValue(strategy = GenerationType.AUTO)
  //     private Long id;

  //     @Column(name = "has_gk")
  //     private Boolean hasGk;

  //     @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "gk")
  //     private Set<SubCompany> subCompany;

  //     public Long getId() {
  //         return id;
  //     }

  //     public void setId(Long id) {
  //         this.id = id;
  //     }

  //     public Set<SubCompany> getSubCompany() {
  //         return subCompany;
  //     }

  //     public void setSubCompany(Set<SubCompany> subCompany) {
  //         this.subCompany = subCompany;
  //     }

  //     public Boolean getHasGk() {
  //         return hasGk;
  //     }

  //     public void setHasGk(Boolean hasGk) {
  //         this.hasGk = hasGk;
  //     }
}
