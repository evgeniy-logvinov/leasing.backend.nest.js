import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  //   JoinColumn,
  //   ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityOfPresenceCustomerCoverageArea } from './city-of-presence-customer-coverage-area.entity';
import { Gk } from './gk.entity';
import { TypesOfFinancedHolding } from './types-of-financed-holding.entity';

@Entity()
export class PreferenceFilter {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  //   @Column()
  //   city: string;
  //   //   list

  //   @Column()
  //   district: string;
  //   //   list

  //   @Column()
  //   zato: boolean;

  @ManyToOne(() => CityOfPresenceCustomerCoverageArea)
  @JoinColumn()
  cityOfPresenceCustomerCoverageArea: CityOfPresenceCustomerCoverageArea;

  @ManyToOne(() => CityOfPresenceCustomerCoverageArea)
  @JoinColumn()
  gk: Gk;

  @ManyToOne(() => TypesOfFinancedHolding)
  @JoinColumn()
  typesOfFinancedHoldings: TypesOfFinancedHolding;

  //     @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "filter")
  //     private Set<CityOfPresenceCustomerCoverageArea> cityOfPresenceCustomerCoverageAreas;

  //     @OneToOne(cascade = CascadeType.ALL)
  //     @JoinColumn(name = "gk_id", referencedColumnName = "id")
  //     private Gk gk;

  //     @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "preferenceFilter")
  //     private Set<TypesOfFinancedHolding> typesOfFinancedHoldings;

  //     public Long getId() {
  //         return id;
  //     }

  //     public void setId(Long id) {
  //         this.id = id;
  //     }

  //     public Set<CityOfPresenceCustomerCoverageArea> getCityOfPresenceCustomerCoverageAreas() {
  //         return cityOfPresenceCustomerCoverageAreas;
  //     }

  //     public void setCityOfPresenceCustomerCoverageAreas(Set<CityOfPresenceCustomerCoverageArea> cityOfPresenceCustomerCoverageAreas) {
  //         this.cityOfPresenceCustomerCoverageAreas = cityOfPresenceCustomerCoverageAreas;
  //     }

  //     public Set<TypesOfFinancedHolding> getTypesOfFinancedHoldings() {
  //         return typesOfFinancedHoldings;
  //     }

  //     public void setTypesOfFinancedHoldings(Set<TypesOfFinancedHolding> typesOfFinancedHoldings) {
  //         this.typesOfFinancedHoldings = typesOfFinancedHoldings;
  //     }

  //     public Gk getGk() {
  //         return gk;
  //     }

  //     public void setGk(Gk gk) {
  //         this.gk = gk;
  //     }
}
