import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CriteriaFinancedHolding {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  maxCountOfMonth: number;
}

// package com.ekl.lizing.model.entity.user.company.filter;

// import javax.persistence.*;

// @Entity
// @Table(name = "criteria_financed_holding")
// public class CriteriaFinancedHolding {

//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Long id;

//     private Number maxCountOfMonth;

//     @OneToOne(cascade = CascadeType.ALL)
//     @JoinColumn(name = "ip_entity_id", referencedColumnName = "id")
//     private IPEntity ipEntity;

//     @OneToOne(cascade = CascadeType.ALL)
//     @JoinColumn(name = "legal_entity_id", referencedColumnName = "id")
//     private LegalEntity legalEntity;

//     public CriteriaFinancedHolding(Number maxCountOfMonth, IPEntity ipEntity, LegalEntity legalEntity) {
//         this.maxCountOfMonth = maxCountOfMonth;
//         this.ipEntity = ipEntity;
//         this.legalEntity = legalEntity;
//     }

//     public CriteriaFinancedHolding() {

//     }

//     public Number getMaxCountOfMonth() {
//         return maxCountOfMonth;
//     }

//     public void setMaxCountOfMonth(Number maxCountOfMonth) {
//         this.maxCountOfMonth = maxCountOfMonth;
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public IPEntity getIpEntity() {
//         return ipEntity;
//     }

//     public void setIpEntity(IPEntity ipEntity) {
//         this.ipEntity = ipEntity;
//     }

//     public LegalEntity getLegalEntity() {
//         return legalEntity;
//     }

//     public void setLegalEntity(LegalEntity legalEntity) {
//         this.legalEntity = legalEntity;
//     }
// }
